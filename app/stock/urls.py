from django.urls import path, include
from rest_framework import routers

from stock.views import OrderBookViewSet

router = routers.DefaultRouter()
router.register(r'', OrderBookViewSet)

urlpatterns = [
    path('', include((router.urls, 'order-book'))),
]

