from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from utils.csv_handler import read_csv, write_csv, append_csv, get_next_id, get_headers

# Define standard field order for consistency
PRODUCT_FIELDS = ['id', 'dealer_id', 'name', 'description', 'price_per_kg', 'category', 'image', 'stock', 'unit', 'status']

class DealerProductView(APIView):
    def get(self, request):
        products = read_csv('products.csv')
        # In a real app, filter by request.user.id
        return Response(products)

    def post(self, request):
        data = request.data.copy()
        data['id'] = get_next_id('products.csv')
        # Default dealer_id if not present (simulating logged in user)
        if 'dealer_id' not in data:
            data['dealer_id'] = 1 
        
        data['status'] = 'Pending' 
            
        # Ensure all fields exist
        row = {field: data.get(field, '') for field in PRODUCT_FIELDS}
        # Keep the ID generated
        row['id'] = data['id'] 
        
        append_csv('products.csv', row, PRODUCT_FIELDS)
        return Response(row, status=status.HTTP_201_CREATED)

class DealerOrderView(APIView):
    def get(self, request):
        orders = read_csv('orders.csv')
        return Response(orders)

class DealerPickupView(APIView):
    def get(self, request):
        pickups = read_csv('pickups.csv')
        return Response(pickups)

class DealerProductDetailView(APIView):
    def get_object(self, pk):
        products = read_csv('products.csv')
        for p in products:
            if str(p['id']) == str(pk):
                return p
        return None

    def put(self, request, pk):
        products = read_csv('products.csv')
        updated = False
        new_data = request.data.copy()
        
        for i, p in enumerate(products):
            if str(p['id']) == str(pk):
                # Update fields
                for field in PRODUCT_FIELDS:
                    if field in new_data:
                        products[i][field] = new_data[field]
                    # Ensure existing fields are preserved if not in new_data? 
                    # Actually for CSV simpler replace might be safer or just updating keys provided
                
                # Ensure structure
                final_row = {field: products[i].get(field, '') for field in PRODUCT_FIELDS}
                products[i] = final_row
                updated = True
                break
        
        if updated:
            write_csv('products.csv', products, PRODUCT_FIELDS)
            return Response(products[i])
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        products = read_csv('products.csv')
        # Filter out the deleted item
        new_products = [p for p in products if str(p['id']) != str(pk)]
        
        if len(new_products) < len(products):
            write_csv('products.csv', new_products, PRODUCT_FIELDS)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)

class DealerProfileView(APIView):
    def get(self, request):
        users = read_csv('users.csv')
        # Simulate getting logged-in dealer (ID 2 = "dealer")
        dealer = next((u for u in users if u['username'] == 'dealer'), None)
        if dealer:
            return Response(dealer)
        return Response({'error': 'Dealer not found'}, status=404)

    def put(self, request):
        users = read_csv('users.csv')
        data = request.data
        updated_user = None
        
        # Try to find user by username if provided, else look for 'dealer' (legacy/demo fallback)
        target_username = data.get('username', 'dealer')

        # Field mapping
        for i, u in enumerate(users):
            if u['username'] == target_username:
                # Business
                if 'businessName' in data: users[i]['name'] = data['businessName']
                if 'gstNumber' in data: users[i]['gst_number'] = data['gstNumber']
                if 'businessAddress' in data: users[i]['business_address'] = data['businessAddress']
                if 'contactNumber' in data: users[i]['phone'] = data['contactNumber']
                if 'email' in data: users[i]['email'] = data['email']
                
                # Bank
                if 'bankAccountNo' in data: users[i]['bank_account_no'] = data['bankAccountNo']
                if 'bankIfsc' in data: users[i]['bank_ifsc'] = data['bankIfsc']
                if 'bankName' in data: users[i]['bank_name'] = data['bankName']
                
                # Hours
                if 'openingTime' in data: users[i]['opening_time'] = data['openingTime']
                if 'closingTime' in data: users[i]['closing_time'] = data['closingTime']
                if 'closedDays' in data: users[i]['closed_days'] = data['closedDays']
                
                # Notifications
                if 'notificationsEnabled' in data: users[i]['notifications_enabled'] = str(data['notificationsEnabled'])
                
                updated_user = users[i]
                break
        
        if updated_user:
            fieldnames = get_headers('users.csv')
            if fieldnames:
                write_csv('users.csv', users, fieldnames)
            return Response(updated_user)
            
        return Response({'error': 'Dealer not found'}, status=404)

class DealerRatesView(APIView):
    def get(self, request):
        rates = read_csv('rates.csv')
        return Response(rates)

    def put(self, request):
        # Update rates.csv (simplified: replace all matching IDs or just overwrite)
        # For this demo, let's assume we send the full list or single item updates.
        # Let's say we receive a list of updates.
        
        # Actually simplest is just to receive the whole list and overwrite if it's not too big.
        # Or receiving a single rate update.
        # Let's support single rate update via /rates/<id>/ but user wants "Price List" tabl. 
        # I'll stick to a simple endpoint that accepts a list of updates.
        pass
        # Wait, standard REST is better. Let's do get/post here? 
        # Let's make it simple: Receives a list, updates those matching IDs.
        
        rates = read_csv('rates.csv')
        updates = request.data if isinstance(request.data, list) else [request.data]
        
        for update in updates:
            for i, rate in enumerate(rates):
                if str(rate['id']) == str(update.get('id')):
                    if 'price' in update: rates[i]['price'] = update['price']
                    # Add other fields if editable
        
        fieldnames = ['id', 'material', 'price', 'unit', 'description']
        write_csv('rates.csv', rates, fieldnames)
        return Response(rates)
