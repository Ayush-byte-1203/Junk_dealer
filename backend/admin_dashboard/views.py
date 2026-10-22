import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from utils.csv_handler import read_csv, write_csv, get_headers

class UserListView(APIView):
    def get(self, request):
        all_users = read_csv('users.csv')
        customers = [u for u in all_users if u['role'] == 'customer']
        return Response(customers)

class DealerListView(APIView):
    def get(self, request):
        all_users = read_csv('users.csv')
        dealers = [u for u in all_users if u['role'] == 'dealer']

        lat = request.query_params.get('lat')
        lng = request.query_params.get('lng')

        if lat and lng:
            try:
                lat = float(lat)
                lng = float(lng)
                new_mocks = []
                for i in range(1, 4):
                    mock_id = f"mock_{i}"
                    mock_dealer = {
                        "id": mock_id,
                        "username": f"mock_user_{i}",
                        "password": "mock_password",
                        "role": "dealer",
                        "name": f"Nearby Dealer {i}",
                        "email": f"dealer{i}@example.com",
                        "phone": "9999999999",
                        "location": "Near You",
                        "lat": str(lat + random.uniform(-0.02, 0.02)),
                        "lng": str(lng + random.uniform(-0.02, 0.02)),
                        "joined_date": "2026-02-01",
                        "gst_number": "",
                        "business_address": "Near You",
                        "bank_account_no": "",
                        "bank_ifsc": "",
                        "bank_name": "",
                        "opening_time": "09:00",
                        "closing_time": "18:00",
                        "closed_days": "",
                        "notifications_enabled": "True"
                    }
                    new_mocks.append(mock_dealer)
                
                # Update users.csv
                all_users_map = {u['id']: u for u in all_users}
                for m in new_mocks:
                    all_users_map[m['id']] = m
                
                headers = get_headers('users.csv')
                if headers:
                    write_csv('users.csv', list(all_users_map.values()), headers)
                
                # Refresh response
                dealers = [u for u in all_users_map.values() if u['role'] == 'dealer']

            except ValueError:
                pass

        return Response(dealers)

class AdminStatsView(APIView):
    def get(self, request):
        users = read_csv('users.csv')
        products = read_csv('products.csv')
        pickups = read_csv('pickups.csv')
        orders = read_csv('orders.csv')

        stats = {
            'total_users': len([u for u in users if u['role'] == 'customer']),
            'total_dealers': len([u for u in users if u['role'] == 'dealer']),
            'active_pickups': len([p for p in pickups if p['status'] == 'Scheduled']),
            'total_revenue': sum(float(o['amount']) for o in orders if o['amount'])
        }
        return Response(stats)

class RatesView(APIView):
    def get(self, request):
        rates = read_csv('rates.csv')
        return Response(rates)

class MarketplaceView(APIView):
    def get(self, request):
        products = read_csv('products.csv')
        active_products = [p for p in products if p.get('status') == 'Active']
        return Response(active_products)

class AdminProductsView(APIView):
    def get(self, request):
        products = read_csv('products.csv')
        status_param = request.query_params.get('status')
        if status_param:
            products = [p for p in products if p.get('status') == status_param]
        return Response(products)

class AdminProductDetailView(APIView):
    def put(self, request, pk):
        products = read_csv('products.csv')
        updated = False
        for p in products:
            if str(p['id']) == str(pk):
                p['status'] = request.data.get('status', p.get('status'))
                p['stock'] = request.data.get('stock', p.get('stock')) # allow stock update too if needed
                updated = True
                break
        
        if updated:
            headers = get_headers('products.csv')
            write_csv('products.csv', products, headers)
            return Response({'message': 'Product updated successfully'})
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


