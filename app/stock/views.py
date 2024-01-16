from django.db.models import Q, F
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response

from stock.models import OrderBook, Transaction
from stock.permissions import IsOrderBookOwner
from stock.serializers import CreateOrderSerializer, OrderBookSerializer, TransactionSerializer


class OrderBookViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = OrderBook.objects.all()
    serializer_class = OrderBookSerializer
    serializer_create_class = CreateOrderSerializer
    serializer_history_class = TransactionSerializer
    permission_classes = (IsOrderBookOwner,)

    def get_queryset(self):
        if self.action == 'history':
            return Transaction.objects.filter(
                Q(sell_order__user=self.request.user) | Q(buy_order__user=self.request.user)
            ).select_related('sell_order', 'buy_order')
        return self.queryset.filter(user=self.request.user, active=True)

    def get_serializer_class(self):
        serializers = {
            'list': self.serializer_class,
            'retrieve': self.serializer_class,
            'create': self.serializer_create_class,
            'history': self.serializer_history_class,
        }

        return serializers.get(self.action, super().get_serializer_class())

    @action(methods=["GET"], detail=False, url_path="history")
    def history(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
