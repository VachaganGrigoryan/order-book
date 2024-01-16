from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _


OrderType = models.TextChoices("OrderType", "BUY, SELL")


class OrderBook(models.Model):
    user = models.ForeignKey(get_user_model(), related_name='orders', on_delete=models.RESTRICT)
    stock_name = models.CharField(max_length=255, verbose_name=_('Stock Name'))
    order_type = models.CharField(max_length=10, choices=OrderType, verbose_name=_('Order Type'))
    price = models.IntegerField(verbose_name=_('Price'))
    quantity = models.IntegerField(verbose_name=_('Quantity'))

    active = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created at'))
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Updated at'))

    def __str__(self):
        return self.stock_name

    def __repr__(self):
        return f'<OrderBook {self.stock_name}, {self.order_type}, {self.price}, {self.quantity}>'

    class Meta:
        db_table = 'orders'
        verbose_name = _('Order Book')
        verbose_name_plural = _('Order Book')
        ordering = ('-created_at',)


class Transaction(models.Model):
    sell_order = models.ForeignKey(OrderBook, related_name='sold_transactions', on_delete=models.RESTRICT)
    buy_order = models.ForeignKey(OrderBook, related_name='bought_transactions', on_delete=models.RESTRICT)

    quantity = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created at'))

    def __str__(self):
        return str(self.sell_order)

    def __repr__(self):
        return f'<OrderBook {self.sell_order}, BUY:{self.buy_order.price}, SELL:{self.sell_order.price}, {self.quantity}>'

    class Meta:
        db_table = 'transactions'
        verbose_name = _('Transaction')
        verbose_name_plural = _('Transactions')
        ordering = ('-created_at',)
