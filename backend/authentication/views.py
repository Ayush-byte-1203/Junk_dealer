from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from utils.csv_handler import read_csv, append_csv, write_csv, get_next_id, get_headers
import datetime
import logging

logger = logging.getLogger(__name__)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'error': 'Username and password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        users = read_csv('users.csv')
        
        # Simple plaintext password check for demo purposes (as requested)
        user = next((u for u in users if u['username'] == username and u['password'] == password), None)

        if user:
            # Return user info excluding password
            user_data = {
                'id': user['id'],
                'username': user['username'],
                'role': user['role'],
                'name': user['name'],
                'email': user['email']
            }
            return Response({
                'success': True,
                'user': user_data,
                'token': 'dummy-jwt-token-for-demo', # Mock token
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
        
        return Response(
            {'success': False, 'message': 'Invalid credentials'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        name = data.get('name')
        email = data.get('email')
        role = data.get('role', 'customer') # Default to customer if not specified
        
        # Validation
        if not all([username, password, name, email]):
             return Response(
                {'success': False, 'message': 'All fields are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check for existing username
        users = read_csv('users.csv')
        if any(u['username'] == username for u in users):
            return Response(
                {'success': False, 'message': 'Username already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Map frontend role to backend role
        # Frontend: [User -> customer], [Dealer -> dealer]
        # Backend roles: customer, dealer, admin
        if role.lower() == 'user':
            role = 'customer'
        elif role.lower() == 'dealer':
            role = 'dealer'
        # else keep as is (e.g. if 'customer' is sent directly)

        # Prepare new user data
        new_id = get_next_id('users.csv')
        new_user = {
            'id': new_id,
            'username': username,
            'password': password,
            'role': role,
            'name': name,
            'email': email,
            'phone': data.get('phone', ''),
            'location': data.get('location', ''),
            'joined_date': datetime.date.today().strftime('%Y-%m-%d')
        }

        # Save to CSV
        fieldnames = ['id', 'username', 'password', 'role', 'name', 'email', 'phone', 'location', 'joined_date']
        append_csv('users.csv', new_user, fieldnames)
        
        logger.info(f"New user registered: {username} as {role}")

        # Return success with user data (excluding password)
        return Response({
            'success': True,
            'message': 'Registration successful',
            'user': {k:v for k,v in new_user.items() if k != 'password'},
            'role': role
        }, status=status.HTTP_201_CREATED)

class UpdateProfileView(APIView):
    def put(self, request):
        # In a real app, we'd use authentication classes. 
        # Here we'll expect the username or ID in the body to identify the user.
        data = request.data
        username = data.get('username')
        
        if not username:
            return Response(
                {'success': False, 'message': 'Username is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        users = read_csv('users.csv')
        user_index = next((index for (index, d) in enumerate(users) if d["username"] == username), None)

        if user_index is None:
            return Response(
                {'success': False, 'message': 'User not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Update fields
        user = users[user_index]
        user['name'] = data.get('fullName', user.get('name', '')) # Map frontend 'fullName' to backend 'name'
        user['email'] = data.get('email', user.get('email', ''))
        user['phone'] = data.get('phone', user.get('phone', ''))
        user['location'] = data.get('location', user.get('location', ''))
        # Address is not in original CSV schema, but we can add it or just ignore if schema is strict.
        # Check RegisterView... fields are: id, username, password, role, name, email, phone, location, joined_date
        # We will update these. 'address' from frontend might map to 'location' or be a new field.
        # Let's map frontend 'address' to a new field 'address' if we want, or just update location.
        # Use provided location logic.
        
        # Determine exact fields to update
        # frontend params: fullName, email, phone, location, address
        
        # Save back
        # Save back
        users[user_index] = user
        
        fieldnames = get_headers('users.csv')
        if fieldnames:
             write_csv('users.csv', users, fieldnames)
        
        return Response({
            'success': True,
            'message': 'Profile updated successfully',
            'user': user
        }, status=status.HTTP_200_OK)
