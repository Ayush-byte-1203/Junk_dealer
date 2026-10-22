import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { createOrder, openRazorpay } from '../utils/razorpay';
import { useAuth } from '../context/AuthContext';


const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const cartItems = location.state?.cartItems || [];
    const [loading, setLoading] = useState(false);

    // Calculate total
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: 'cod'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOrderSuccess = async (paymentId = 'COD') => {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            items: cartItems,
            total: totalAmount,
            shipping: formData,
            date: new Date().toLocaleDateString(),
            status: 'Processing',
            paymentId: paymentId,
            paymentMethod: formData.paymentMethod
        };

        const apiData = {
            user_id: user?.id || 1,
            dealer_id: 1, // Default, assuming platform or generic dealer
            items: JSON.stringify(cartItems),
            total_amount: totalAmount,
            shipping_address: JSON.stringify(formData),
            payment_method: formData.paymentMethod,
            status: 'Processing',
            date: new Date().toISOString().split('T')[0]
        };

        try {
            const response = await fetch('http://localhost:8000/api/user/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData)
            });

            if (!response.ok) {
                console.error("Failed to save order to backend");
            }
        } catch (err) {
            console.error("API Error", err);
        }

        // Save (keep local for now for user dash fallback)
        const existingOrders = JSON.parse(localStorage.getItem('my_orders') || '[]');
        localStorage.setItem('my_orders', JSON.stringify([newOrder, ...existingOrders]));

        // Clear Cart
        localStorage.removeItem('cart_items');
        window.dispatchEvent(new CustomEvent('cart-updated'));

        setLoading(false);
        alert(`Order Placed Successfully! 🎉\nPayment ID: ${paymentId}`);
        navigate('/orders');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.paymentMethod === 'online') {
            try {
                // 1. Create Order
                const orderData = await createOrder(totalAmount);

                // 2. Open Razorpay
                openRazorpay(
                    orderData,
                    user || { name: formData.fullName, email: 'guest@example.com', phone: formData.phone },
                    (verifyData) => {
                        // Payment Success
                        handleOrderSuccess(verifyData.razorpay_payment_id);
                    },
                    (errorMsg) => {
                        // Payment Failed
                        setLoading(false);
                        alert(`Payment Failed: ${errorMsg}`);
                    }
                );
            } catch (error) {
                setLoading(false);
                alert('Failed to initiate payment. Please try again.');
            }
        } else {
            // COD Flow
            setTimeout(() => {
                handleOrderSuccess('COD');
            }, 2000);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">No items to checkout</h2>
                        <Button variant="outline" onClick={() => navigate('/marketplace')}>
                            Return to Marketplace
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button
                    variant="ghost"
                    className="mb-6 pl-0 hover:bg-transparent hover:text-emerald-600"
                    onClick={() => navigate('/cart')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                </Button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Truck className="h-5 w-5 text-emerald-600" />
                                    Shipping Information
                                </CardTitle>
                                <CardDescription>Where should we deliver your order?</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <Input id="fullName" name="fullName" placeholder="John Doe" required value={formData.fullName} onChange={handleInputChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" name="phone" placeholder="+91 98765 43210" required value={formData.phone} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" name="address" placeholder="123 Green Street, Sector 4" required value={formData.address} onChange={handleInputChange} />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" name="city" placeholder="Mumbai" required value={formData.city} onChange={handleInputChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="zipCode">ZIP Code</Label>
                                            <Input id="zipCode" name="zipCode" placeholder="400001" required value={formData.zipCode} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-emerald-600" />
                                    Payment Method
                                </CardTitle>
                                <CardDescription>Select how you want to pay</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-slate-50 ${formData.paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50/50' : ''}`} onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}>
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-primary">
                                            {formData.paymentMethod === 'cod' && <div className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
                                        </div>
                                        <Label className="flex-1 cursor-pointer font-medium">Cash on Delivery (COD)</Label>
                                    </div>
                                    <div className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors ${formData.paymentMethod === 'online' ? 'border-emerald-500 bg-emerald-50/50' : ''}`} onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'online' }))}>
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-primary">
                                            {formData.paymentMethod === 'online' && <div className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
                                        </div>
                                        <Label className="flex-1 cursor-pointer font-medium">Pay Online (Razorpay)</Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
                            <h3 className="font-bold text-slate-800 text-lg mb-4">Order Summary</h3>
                            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-slate-600 max-w-[150px] truncate">{item.name} <span className="text-xs text-slate-400">x{item.quantity}</span></span>
                                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(0)}</span>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-slate-100 my-4" />

                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span>₹{totalAmount.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-100 mt-2">
                                    <span>Total</span>
                                    <span>₹{totalAmount.toFixed(0)}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-6 text-lg"
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : `Pay ₹${totalAmount.toFixed(0)}`}
                            </Button>

                            <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Secure Checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
