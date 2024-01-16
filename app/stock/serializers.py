from django.db import transaction
from django.db.models import Q
from rest_framework import serializers

from stock.models import OrderBook, OrderType, Transaction


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderBook
        fields = ('id', 'stock_name', 'order_type', 'price', 'quantity')

    @staticmethod
    def order_by_type(order_type):
        return {OrderType.BUY: 'buy_order', OrderType.SELL: 'sell_order'}.get(order_type)

    @transaction.atomic
    def create(self, validated_data):
        validated_data['user'] = self.context.get('request').user
        validated_data['active'] = False

        instance = super().create(validated_data)

        qs = OrderBook.objects.filter(
            Q(active=True) &
            ~Q(user=instance.user) &
            Q(stock_name=instance.stock_name) &
            ~Q(order_type=instance.order_type) &
            (Q(price__lte=instance.price) if instance.order_type == OrderType.BUY else Q(price__gte=instance.price))
        )

        for order in qs:
            qty = instance.quantity - order.quantity
            if qty > 0:
                txn_quantity = order.quantity
                instance.quantity, order.quantity = qty, 0
            else:
                txn_quantity = instance.quantity
                instance.quantity, order.quantity = 0, abs(qty)

            Transaction.objects.create(
                **{
                    self.order_by_type(instance.order_type): instance,
                    self.order_by_type(order.order_type): order,
                },
                quantity=txn_quantity,
            )

            if order.quantity < 1:
                order.active = False
            order.save()

            if instance.quantity < 1:
                break
        else:
            instance.active = True

        instance.save()
        return instance


class OrderBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderBook
        fields = ('id', 'stock_name', 'order_type', 'price', 'quantity', 'created_at')


class OrderBookHistory(serializers.ModelSerializer):
    class Meta:
        model = OrderBook
        fields = ('id', 'stock_name', 'order_type', 'price')


class TransactionSerializer(serializers.ModelSerializer):
    order = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = ('id', 'order', 'quantity', 'created_at')

    def get_order(self, txn):
        user = self.context.get('request').user
        if txn.sell_order.user_id == user.id:
            return OrderBookHistory(txn.sell_order).data
        return OrderBookHistory(txn.buy_order).data
