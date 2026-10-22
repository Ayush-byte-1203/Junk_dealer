import razorpay
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Initialize Razorpay Client
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

@api_view(['POST'])
def create_order(request):
    """
    Create a Razorpay Order.
    Expected data: { "amount": 500, "currency": "INR" }
    """
    try:
        amount = int(request.data.get('amount')) * 100  # Convert to paise
        currency = request.data.get('currency', 'INR')
        
        data = {
            'amount': amount,
            'currency': currency,
            'payment_capture': '1'  # Auto capture
        }
        
        order = client.order.create(data=data)
        
        return Response({
            'id': order['id'],
            'amount': order['amount'],
            'currency': order['currency'],
            'key': settings.RAZORPAY_KEY_ID
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def verify_payment(request):
    """
    Verify Razorpay Payment Signature.
    Expected data: { "razorpay_order_id": "", "razorpay_payment_id": "", "razorpay_signature": "" }
    """
    try:
        data = request.data
        params_dict = {
            'razorpay_order_id': data.get('razorpay_order_id'),
            'razorpay_payment_id': data.get('razorpay_payment_id'),
            'razorpay_signature': data.get('razorpay_signature')
        }
        
        # Verify signature
        client.utility.verify_payment_signature(params_dict)
        
        return Response({'success': True, 'message': 'Payment Verified Successfully'}, status=status.HTTP_200_OK)
        
    except razorpay.errors.SignatureVerificationError:
        return Response({'success': False, 'message': 'Payment Verification Failed'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
