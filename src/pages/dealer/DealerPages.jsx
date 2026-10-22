import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Dealer.css';
import { TrendingUp, Users, DollarSign, Package, AlertTriangle, ArrowUpRight, ArrowDownRight, Search, Filter, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Add Product Component ---
export const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.name || !formData.category || !formData.price || !formData.stock || !formData.description) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('category', formData.category);
            data.append('price_per_kg', formData.price); // Map to backend field
            data.append('stock', formData.stock);
            data.append('description', formData.description);
            data.append('unit', 'kg'); // Default unit
            data.append('status', 'Active'); // Default status

            if (formData.image) {
                // In a real app with file handling, we append the file. 
                // Our simple CSV backend just stores the string/name, which Django's request.data handles differently.
                data.append('image', formData.image.name);
            }

            const response = await fetch('http://localhost:8000/api/dealer/products/', {
                method: 'POST',
                body: data,
                // Do not set Content-Type header for FormData, browser does it automatically with boundary
            });

            if (response.ok) {
                alert('Product added successfully!');
                // Reset form
                setFormData({
                    name: '',
                    category: '',
                    price: '',
                    stock: '',
                    description: '',
                    image: null
                });
            } else {
                const text = await response.text();
                console.error('Add Product Failed:', response.status, text);
                alert(`Failed to add product (Status: ${response.status}). Error: ${text}`);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="dealer-container">
            <div className="dealer-header" style={{ justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                <h1>Add New Product</h1>
                <p>List a new product for sale</p>
            </div>

            <div className="dealer-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category *</label>
                        <select
                            className="form-control"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select category</option>
                            <option value="Metals">Metals</option>
                            <option value="Plastics">Plastics</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Paper">Paper</option>
                            <option value="Glass">Glass</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Price (₹) *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock Quantity *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            className="form-control"
                            placeholder="Describe your product..."
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Product Image</label>
                        <div className="image-upload-area" onClick={() => document.getElementById('product-image-input').click()}>
                            <input
                                type="file"
                                id="product-image-input"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {formData.image ? (
                                <div>
                                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                                    <p>{formData.image.name}</p>
                                    <small style={{ color: '#10b981' }}>Image selected</small>
                                </div>
                            ) : (
                                <>
                                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📷</div>
                                    <p>Click to upload product image</p>
                                    <small style={{ color: '#64748b' }}>PNG or JPEG (max 5MB)</small>
                                </>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Add Product</button>
                </form>
            </div>
        </div>
    );
};



// --- Dealer Analytics Component ---
export const DealerAnalytics = () => {
    const stats = [
        { label: "Total Revenue", value: "₹45,231", change: "+20.1%", trend: "up", icon: DollarSign, color: "bg-emerald-500" },
        { label: "Active Customers", value: "2,345", change: "+15.2%", trend: "up", icon: Users, color: "bg-blue-500" },
        { label: "Total Pickups", value: "1,432", change: "-4.5%", trend: "down", icon: Package, color: "bg-violet-500" },
        { label: "Average Rating", value: "4.8", change: "+0.2%", trend: "up", icon: TrendingUp, color: "bg-amber-500" },
    ];

    return (
        <div className="dealer-container p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Analytics & Reports</h1>
                    <p className="text-slate-500">Track your business performance</p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                        <option>This Month</option>
                        <option>This Year</option>
                    </select>
                    <button className="h-10 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color.replace("bg-", "text-")}`} />
                            </div>
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === "up" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                                }`}>
                                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Visual Placeholder for Charts */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Overview</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    { name: 'Jan', revenue: 4000 },
                                    { name: 'Feb', revenue: 6500 },
                                    { name: 'Mar', revenue: 4500 },
                                    { name: 'Apr', revenue: 8000 },
                                    { name: 'May', revenue: 5500 },
                                    { name: 'Jun', revenue: 9000 },
                                    { name: 'Jul', revenue: 7000 },
                                    { name: 'Aug', revenue: 8500 },
                                    { name: 'Sep', revenue: 6000 },
                                    { name: 'Oct', revenue: 7500 },
                                    { name: 'Nov', revenue: 5000 },
                                    { name: 'Dec', revenue: 9500 },
                                ]}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Material Breakdown</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Metals", value: 45, color: "bg-blue-500" },
                            { label: "Plastics", value: 30, color: "bg-emerald-500" },
                            { label: "Paper", value: 15, color: "bg-amber-500" },
                            { label: "Electronics", value: 10, color: "bg-violet-500" }
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-slate-700">{item.label}</span>
                                    <span className="text-slate-500">{item.value}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Dealer Inventory Component ---
export const DealerInventory = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [stockFilter, setStockFilter] = useState('Stock Status');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            // Using absolute URL as established in previous fixes
            const response = await fetch('http://localhost:8000/api/dealer/products/');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handleUpdateStock = async (product) => {
        const newStock = prompt(`Update stock for ${product.name} (${product.unit}):`, product.stock);

        if (newStock !== null && newStock !== "" && !isNaN(newStock)) {
            try {
                const response = await fetch(`http://localhost:8000/api/dealer/products/${product.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        stock: newStock
                    }),
                });

                if (response.ok) {
                    alert('Stock updated successfully!');
                    // Refresh inventory
                    fetchInventory();
                } else {
                    alert('Failed to update stock');
                }
            } catch (error) {
                console.error('Error updating stock:', error);
                alert('Error connecting to server');
            }
        }
    };

    const handleHistory = (productName) => {
        alert(`Stock history for ${productName} will be available in the next update.`);
    };

    // Helper to calculate status
    const getStockStatus = (product) => {
        if (product.status === "Pending") return { label: "Approval Pending", color: "bg-blue-50 text-blue-600" };
        if (product.status === "Rejected") return { label: "Rejected", color: "bg-red-50 text-red-600" };

        const val = parseInt(product.stock);
        if (val === 0) return { label: "Out of Stock", color: "bg-red-50 text-red-600" };
        if (val < 50) return { label: "Low Stock", color: "bg-amber-50 text-amber-600" };
        return { label: "In Stock", color: "bg-emerald-50 text-emerald-600" };
    };

    // Filtering Logic
    const filteredProducts = products.filter(product => {
        // Search Filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());

        // Category Filter
        const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;

        // Stock Filter
        const status = getStockStatus(product).label;
        const matchesStock = stockFilter === 'Stock Status' || status === stockFilter;

        return matchesSearch && matchesCategory && matchesStock;
    });

    // Extract unique categories for filter dropdown
    const categories = ['All Categories', ...new Set(products.map(p => p.category))];

    return (
        <div className="dealer-container p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
                    <p className="text-slate-500">Manage your product stock availability</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium text-sm">
                        + Add Stock
                    </button>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium text-sm flex items-center gap-2">
                        <Download className="w-4 h-4" /> Report
                    </button>
                </div>
            </div>

            {/* Alert Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-amber-800">Low Stock Alert</h4>
                    <p className="text-sm text-amber-700 mt-1">
                        Some items are running low on stock. Consider restocking soon to avoid losing sales.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="py-2 pl-3 pr-8 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="py-2 pl-3 pr-8 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                    <option>Stock Status</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                </select>
            </div>

            {/* Inventory Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-slate-500">No products match your filters.</div>
                ) : (
                    filteredProducts.map((item, index) => {
                        const status = getStockStatus(item);
                        // Mock capacity for visual bar since backend doesn't have it
                        const capacity = 1000;
                        const stockVal = parseInt(item.stock) || 0;
                        const percentage = Math.min((stockVal / capacity) * 100, 100);

                        return (
                            <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{item.name}</h3>
                                        <p className="text-xs text-slate-500">{item.category}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
                                        {status.label}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="text-slate-600">Current Stock</span>
                                        <span className="font-medium text-slate-900">{item.stock} {item.unit}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div
                                            className={`h-full rounded-full ${percentage < 20 ? "bg-red-500" : percentage < 50 ? "bg-amber-500" : "bg-emerald-500"}`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleHistory(item.name)}
                                        className="flex-1 py-1.5 text-xs font-medium border border-slate-200 rounded hover:bg-slate-50 transition"
                                    >
                                        History
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStock(item)}
                                        className="flex-1 py-1.5 text-xs font-medium bg-slate-900 text-white rounded hover:bg-slate-800 transition"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

// --- Dealer Pickups Component ---
export const DealerPickups = () => {
    const [pickups, setPickups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPickups = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/dealer/pickups/');
                if (response.ok) {
                    const data = await response.json();
                    setPickups(data);
                }
            } catch (error) {
                console.error("Error fetching pickups:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPickups();
    }, []);

    if (loading) return <div className="dealer-container p-6">Loading...</div>;

    return (
        <div className="dealer-container">
            <div className="dealer-header">
                <h1>Pickup Requests</h1>
                <p>View pickup bookings in your area</p>
            </div>

            {pickups.length === 0 ? (
                <div className="p-6 text-center text-slate-500 bg-white rounded-xl border border-slate-200">No pickup requests found.</div>
            ) : (
                pickups.map((pickup, index) => (
                    <div key={index} className="pickup-card">
                        <div className="pickup-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>📄</span>
                                <strong>{pickup.items || 'Scrap'}</strong>
                            </div>
                            <span className="pickup-badge" style={{ background: '#10b981' }}>{pickup.total_weight} kg</span>
                        </div>
                        <div className="pickup-body">
                            <div className="info-block">
                                <h4>Customer ID</h4>
                                <p>{pickup.user_id}</p>
                            </div>
                            <div className="info-block">
                                <h4>Pickup Date</h4>
                                <p>{pickup.scheduled_date}</p>
                            </div>
                            <div className="info-block" style={{ gridColumn: '1 / -1' }}>
                                <h4>Address</h4>
                                <p>{pickup.address}</p>
                            </div>
                            <div className="info-block" style={{ gridColumn: '1 / -1' }}>
                                <h4>Notes</h4>
                                <p>{pickup.notes}</p>
                            </div>
                        </div>
                        <div className="pickup-footer">
                            <span className="pickup-badge" style={{ background: pickup.status === 'Completed' ? '#d1fae5' : '#fff7ed', color: pickup.status === 'Completed' ? '#065f46' : '#9a3412', border: '1px solid currentColor' }}>
                                {pickup.status || 'Scheduled'}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

// --- Dealer Orders Component ---
export const DealerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/dealer/orders/');
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="dealer-container p-6">Loading...</div>;

    const parseItems = (itemsStr) => {
        try {
            const items = JSON.parse(itemsStr);
            return Array.isArray(items) ? items : [];
        } catch {
            return [];
        }
    };

    const parseAddress = (addrStr) => {
        try {
            const addr = JSON.parse(addrStr);
            return addr?.fullName || 'Guest';
        } catch {
            return 'Guest';
        }
    };

    return (
        <div className="dealer-container p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Orders Received</h1>
                    <p className="text-slate-500">Manage orders for your products</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="p-6 text-center text-slate-500 bg-white rounded-xl border border-slate-200">No orders received yet.</div>
            ) : (
                orders.map((order, index) => {
                    const orderItems = parseItems(order.items);
                    const customerName = parseAddress(order.shipping_address);

                    return (
                        <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">📦</div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">Order #{order.id}</h3>
                                        <p className="text-sm text-slate-500">📅 {order.date}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'}`}>
                                    {order.status === 'Completed' ? '✅ Completed' : '⏳ ' + order.status}
                                </span>
                            </div>

                            <div className="p-6 grid md:grid-cols-2 gap-6">
                                {/* Customer Details */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">👤</div>
                                        <h4 className="font-semibold text-slate-900">Customer Details</h4>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-red-500">📍</span>
                                            <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">CUSTOMER NAME</span>
                                        </div>
                                        <div className="font-medium text-slate-900 pl-6">{customerName}</div>
                                    </div>
                                </div>

                                {/* Purchased Materials */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs">🛍️</div>
                                        <h4 className="font-semibold text-slate-900">Purchased Materials</h4>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col gap-2">
                                        {orderItems.length > 0 ? orderItems.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="text-xl">📦</div>
                                                <div className="flex-1">
                                                    <h5 className="text-sm font-medium text-slate-900">{item.name}</h5>
                                                    <div className="flex justify-between w-full">
                                                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-200 text-slate-700">Qty: {item.quantity}</span>
                                                        <span className="text-sm font-bold text-slate-700">₹{item.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : <span className="text-slate-500 italic">No items details</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                                <span className="font-semibold text-slate-500 text-sm tracking-wider">TOTAL PAYMENT</span>
                                <span className="text-xl font-bold text-emerald-600">₹{order.total_amount}</span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};


// --- Dealer Settings Component ---
export const DealerSettings = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        gstNumber: '',
        businessAddress: '',
        contactNumber: '',
        email: '',
        // Bank
        bankAccountNo: '',
        bankIfsc: '',
        bankName: '',
        // Hours
        openingTime: '',
        closingTime: '',
        closedDays: '',
        // Notifications
        notificationsEnabled: false
    });

    const [activeTab, setActiveTab] = useState('Business Profile');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/dealer/profile/');
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    businessName: data.name || '',
                    gstNumber: data.gst_number || '',
                    businessAddress: data.business_address || '',
                    contactNumber: data.phone || '',
                    email: data.email || '',
                    bankAccountNo: data.bank_account_no || '',
                    bankIfsc: data.bank_ifsc || '',
                    bankName: data.bank_name || '',
                    openingTime: data.opening_time || '',
                    closingTime: data.closing_time || '',
                    closedDays: data.closed_days || '',
                    notificationsEnabled: data.notifications_enabled === 'true'
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/dealer/profile/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) alert('Settings saved successfully!');
            else alert('Failed to save settings');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Error connecting to server');
        }
    };

    const tabs = ['Business Profile', 'Bank Details', 'Operating Hours', 'Notifications'];

    return (
        <div className="dealer-container p-6 space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">Manage your business profile and preferences</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                            ? 'border-emerald-500 text-emerald-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Business Profile Tab */}
            {activeTab === 'Business Profile' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-4xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Business Information</h3>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Business Name *</label>
                            <input
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">GST Number</label>
                            <input
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Business Address *</label>
                            <textarea
                                name="businessAddress"
                                value={formData.businessAddress}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            ></textarea>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number *</label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition shadow-sm"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bank Details Tab */}
            {activeTab === 'Bank Details' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-4xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Banking Information</h3>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                            <input
                                type="text"
                                name="bankAccountNo"
                                value={formData.bankAccountNo}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">IFSC Code</label>
                            <input
                                type="text"
                                name="bankIfsc"
                                value={formData.bankIfsc}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Bank Name</label>
                            <input
                                type="text"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition shadow-sm">Save Changes</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Operating Hours Tab */}
            {activeTab === 'Operating Hours' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-4xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Operating Schedule</h3>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Opening Time</label>
                                <input
                                    type="time"
                                    name="openingTime"
                                    value={formData.openingTime}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Closing Time</label>
                                <input
                                    type="time"
                                    name="closingTime"
                                    value={formData.closingTime}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Closed Days (e.g., Sunday)</label>
                            <input
                                type="text"
                                name="closedDays"
                                value={formData.closedDays}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition shadow-sm">Save Changes</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'Notifications' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-4xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Notification Preferences</h3>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="notificationsEnabled"
                                checked={formData.notificationsEnabled}
                                onChange={handleChange}
                                className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                            />
                            <label className="text-sm font-medium text-slate-700">Enable Email Notifications</label>
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition shadow-sm">Save Preferences</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            console.log("Fetching products...");
            const response = await fetch('http://localhost:8000/api/dealer/products/');
            console.log("Response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("Data received:", data);
                setProducts(data);
            } else {
                const text = await response.text();
                console.error("Fetch failed:", response.status, text);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`http://localhost:8000/api/dealer/products/${id}/`, {
                method: 'DELETE',
            });
            if (response.ok || response.status === 204) {
                setProducts(products.filter(p => parseInt(p.id) !== parseInt(id)));
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="dealer-container p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Products</h1>
                    <p className="text-slate-500">Manage your listed scrap materials</p>
                </div>
                <button
                    onClick={() => navigate('/dealer-add-product')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
                >
                    <span>+</span> Add New Product
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Product Name</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Category</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Price/kg</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Stock</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{product.name}</div>
                                        <div className="text-xs text-slate-500">Updated: {product.lastUpdated}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                             {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-emerald-600">₹{product.price}</td>
                                    <td className="px-6 py-4 text-slate-600">{product.stock}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${product.status === "Active"
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-amber-50 text-amber-700"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${product.status === "Active" ? "bg-emerald-500" : "bg-amber-500"
                                                }`}></span>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-emerald-600 transition mx-1">Edit</button>
                                        <button onClick={() => handleDelete(product.id)} className="text-slate-400 hover:text-red-600 transition mx-1">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
