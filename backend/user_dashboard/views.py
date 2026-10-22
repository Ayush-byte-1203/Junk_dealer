from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from utils.csv_handler import read_csv, append_csv, get_next_id
import datetime

class UserPickupView(APIView):
    def get(self, request):
        # Filter by logged in user in real app
        pickups = read_csv('pickups.csv')
        return Response(pickups)

    def post(self, request):
        data = request.data
        data['id'] = get_next_id('pickups.csv')
        data['status'] = 'Scheduled'
        data['scheduled_date'] = data.get('scheduled_date', str(datetime.date.today()))
        
        fieldnames = ['id', 'user_id', 'dealer_id', 'status', 'scheduled_date', 'items', 'total_weight', 'address', 'notes']
        append_csv('pickups.csv', data, fieldnames)
        return Response(data, status=status.HTTP_201_CREATED)

class UserOrdersView(APIView):
    def post(self, request):
        data = request.data
        data['id'] = get_next_id('orders.csv')
        data['date'] = str(datetime.date.today())
        data['status'] = 'Processing'
        
        # Ensure fields exist
        fieldnames = ['id', 'user_id', 'items', 'total_amount', 'shipping_address', 'payment_method', 'status', 'date', 'dealer_id']
        append_csv('orders.csv', data, fieldnames)
        return Response(data, status=status.HTTP_201_CREATED)

class UserEarningsView(APIView):
    def get(self, request):
        orders = read_csv('orders.csv')
        # Filter by user_id in real app
        # defensive coding for missing amount
        total_earnings = sum(float(o['amount']) for o in orders if o.get('amount') and o['amount'].replace('.', '', 1).isdigit())
        return Response({'total_earnings': total_earnings, 'history': orders})
