from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from stock.models import OrderBook


class OrderBookAPITestCase(TestCase):
    def setUp(self):
        # Create a test user for authentication
        self.main_user = User.objects.create_user(username='main_test_user', password='testpassword')
        self.second_user = User.objects.create_user(username='second_test_user', password='testpassword')

        # Create a sample stock object for testing
        self.stock_data = {'stock_name': 'AAPL', 'price': 150.00, 'quantity': 10, 'active': True}
        self.stock = OrderBook.objects.create(**self.stock_data, user_id=self.main_user.id, order_type='BUY')

        # Authenticate the client with the main test user
        self.client_one = APIClient()
        self.client_one.login(username='main_test_user', password='testpassword')

        # Authenticate the client with the second test user
        self.client_two = APIClient()
        self.client_two.login(username='second_test_user', password='testpassword')

    def test_create_stock_with_main_user(self):
        # Test creating a new stock object
        response = self.client_one.post('/api/order-book/', {**self.stock_data, 'order_type': 'SELL'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(OrderBook.objects.count(), 2)
        self.assertEqual(response.data['quantity'], 10)

    def test_create_stock_whit_second_user(self):
        # Test creating a new stock object
        response = self.client_two.post('/api/order-book/', {**self.stock_data, 'order_type': 'SELL'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['quantity'], 0)

    def test_retrieve_stock_list(self):
        # Test retrieving a list of stocks
        response = self.client_one.get('/api/order-book/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
