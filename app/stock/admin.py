from django.contrib import admin

from stock.models import OrderBook, Transaction


@admin.register(OrderBook)
class OrderBookAdmin(admin.ModelAdmin):
    list_display = ('stock_name', 'user', 'order_type', 'price', 'quantity', 'active', 'created_at')

    list_editable = ('active',)


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('sell_order', 'buy_order', 'quantity', 'created_at')

    readonly_fields = ('sell_order', 'buy_order', 'quantity', 'created_at')
