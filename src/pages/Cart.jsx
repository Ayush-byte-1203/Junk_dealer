import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Trash2, ArrowRight, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import productImages from '../Product_img';


const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart_items') || '[]');
        setCartItems(storedCart);

        // Listen for updates from other tabs/components
        const handleStorageChange = () => {
            const updatedCart = JSON.parse(localStorage.getItem('cart_items') || '[]');
            setCartItems(updatedCart);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('cart-updated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('cart-updated', handleStorageChange);
        };
    }, []);

    const updateQuantity = (id, change) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart_items', JSON.stringify(updatedCart));
        window.dispatchEvent(new CustomEvent('cart-updated'));
    };

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart_items', JSON.stringify(updatedCart));
        window.dispatchEvent(new CustomEvent('cart-updated'));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                        <ShoppingCart size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Your Cart</h1>
                        <p className="text-slate-500">Manage your scrap items</p>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <ShoppingCart size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">Looks like you haven't added any scrap materials yet. Browse our marketplace to find items.</p>
                        <Link to="/marketplace">
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8 py-6 text-lg">
                                Start Selling
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                                        {item.image && productImages[item.image] ? (
                                            <img
                                                src={productImages[item.image]}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs uppercase tracking-wider">
                                                {item.category}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
                                        <p className="text-emerald-600 font-medium">₹{item.price} / kg</p>
                                    </div>

                                    <div className="flex items-center gap-4 bg-slate-50 rounded-full px-2 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-bold text-slate-700 w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    <div className="text-right min-w-[80px]">
                                        <p className="font-bold text-slate-900 text-lg">₹{(item.price * item.quantity).toFixed(0)}</p>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
                                <h3 className="font-bold text-slate-800 text-xl mb-6">Order Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Total Items</span>
                                        <span className="font-medium text-slate-900">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} units</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-slate-900">₹{calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-emerald-600 bg-emerald-50 p-4 rounded-xl">
                                        <span className="font-bold">Estimated Total</span>
                                        <span className="font-bold text-xl">₹{calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 text-center mt-2">
                                        * Final price may vary based on actual weight at pickup.
                                    </p>
                                </div>

                                <Button
                                    onClick={() => navigate('/checkout', { state: { cartItems: cartItems } })}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6 text-lg shadow-lg shadow-emerald-200"
                                >
                                    Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
