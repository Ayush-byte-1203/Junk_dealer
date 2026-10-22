/**
 * Utility functions for Razorpay integration
 */

const API_BASE_URL = 'http://localhost:8000/api/payments';

// Create Order on Backend
export const createOrder = async (amount) => {
    try {
        const response = await fetch(`${API_BASE_URL}/create-order/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount, currency: 'INR' }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to create order');
        return data;
    } catch (error) {
        console.error('Create Order Error:', error);
        throw error;
    }
};

// Verify Payment on Backend
export const verifyPayment = async (response, orderData, successCallback, errorCallback) => {
    try {
        const verifyResponse = await fetch(`${API_BASE_URL}/verify/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
            }),
        });
        const verifyData = await verifyResponse.json();

        if (verifyResponse.ok && verifyData.success) {
            // Pass the response object which contains razorpay_payment_id
            successCallback(response);
        } else {
            errorCallback(verifyData.message || 'Verification failed');
        }
    } catch (error) {
        console.error('Verify Payment Error:', error);
        errorCallback('Network error during verification');
    }
};

// Open Razorpay Checkout
export const openRazorpay = (orderData, user, onSuccess, onError) => {
    const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Junk Dealer Marketplace",
        description: "Transaction for Order #" + orderData.id,
        image: "/logo192.png", // Ensure this exists or use a remote URL
        order_id: orderData.id,
        handler: function (response) {
            verifyPayment(response, orderData, onSuccess, onError);
        },
        prefill: {
            name: user?.name || "",
            email: user?.email || "",
            contact: user?.phone || ""
        },
        theme: {
            color: "#10b981" // Emerald-500
        }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        onError(response.error.description);
    });
    rzp1.open();
};
