import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Package, Calendar, MapPin, ChevronRight, Search, Truck, X, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { generateInvoicePDF } from '../utils/invoiceGenerator';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // For Invoice Modal

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('my_orders') || '[]');
        setOrders(storedOrders);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 relative">
            <Navbar />

            <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">My Orders</h1>
                        <p className="text-slate-500">Track and manage your purchases</p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <Package size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No orders yet</h3>
                        <p className="text-slate-500 mb-6">You haven't purchased any recycled materials yet.</p>
                        <Link to="/marketplace">
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                Browse Marketplace
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <Card key={order.id} className="overflow-hidden border-slate-200">
                                <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex gap-6 text-sm">
                                        <div>
                                            <p className="text-slate-500 mb-1">Order Placed</p>
                                            <p className="font-medium text-slate-800">{order.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 mb-1">Total</p>
                                            <p className="font-medium text-slate-800">₹{order.total.toFixed(0)}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 mb-1">Ship To</p>
                                            <div className="font-medium text-emerald-700 hover:underline cursor-pointer relative group">
                                                {order.shipping.fullName}
                                                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-xs p-2 rounded shadow-lg whitespace-nowrap z-10">
                                                    {order.shipping.address}, {order.shipping.city}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">
                                            {order.status}
                                        </Badge>
                                        <span className="text-slate-400 text-sm">#{order.id}</span>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                                        <Package className="text-slate-400 w-8 h-8" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800">{item.name}</p>
                                                        <p className="text-sm text-slate-500">Qty: {item.quantity} • ₹{item.price}/kg</p>
                                                    </div>
                                                </div>
                                                <p className="font-medium text-slate-900">₹{(item.price * item.quantity).toFixed(0)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <hr className="my-4 border-slate-100" />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Truck className="w-4 h-4" />
                                            <span>
                                                Delivery by <span className="font-medium text-slate-900">
                                                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                                </span>
                                            </span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            View Invoice
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Invoice Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Invoice Details</h2>
                                <p className="text-sm text-gray-500">Order #{selectedOrder.id}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            {/* Invoice Header Info */}
                            <div className="flex justify-between mb-8">
                                <div>
                                    <h3 className="font-bold text-lg text-emerald-600">Junk Dealer</h3>
                                    <p className="text-sm text-gray-500">Eco City, Earth 404</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">Date: {selectedOrder.date}</p>
                                    <p className="text-sm text-gray-500">Status: {selectedOrder.status}</p>
                                </div>
                            </div>

                            {/* Bill To */}
                            <div className="mb-8 p-4 bg-slate-50 rounded-lg">
                                <h4 className="font-semibold text-gray-700 mb-2">Bill To:</h4>
                                <p className="text-sm text-gray-600 font-medium">{selectedOrder.shipping.fullName}</p>
                                <p className="text-sm text-gray-600">{selectedOrder.shipping.address}</p>
                                <p className="text-sm text-gray-600">{selectedOrder.shipping.city}, {selectedOrder.shipping.zipCode}</p>
                                <p className="text-sm text-gray-600">{selectedOrder.shipping.phone}</p>
                            </div>

                            {/* Items Table */}
                            <div className="border rounded-lg overflow-hidden mb-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Item</th>
                                            <th className="px-4 py-3 font-medium text-right">Qty</th>
                                            <th className="px-4 py-3 font-medium text-right">Price</th>
                                            <th className="px-4 py-3 font-medium text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {selectedOrder.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-3 text-gray-800">{item.name}</td>
                                                <td className="px-4 py-3 text-right text-gray-600">{item.quantity}</td>
                                                <td className="px-4 py-3 text-right text-gray-600">₹{item.price}</td>
                                                <td className="px-4 py-3 text-right font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(0)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Totals */}
                            <div className="space-y-2 border-t pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">₹{selectedOrder.total.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-emerald-600">Free</span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t mt-2">
                                    <span>Total Amount</span>
                                    <span>₹{selectedOrder.total.toFixed(0)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                                Close
                            </Button>
                            <Button
                                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                                onClick={() => generateInvoicePDF(selectedOrder)}
                            >
                                <Download className="w-4 h-4" />
                                Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Orders;
