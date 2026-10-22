import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, CheckCircle, XCircle, AlertTriangle, Eye, Download, UserPlus } from 'lucide-react';
import './Admin.css';

// --- User Management Component ---
export const UserManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock Users Data
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joinDate: '2023-10-15' },
        { id: 2, name: 'Eco Scrap Co.', email: 'contact@ecoscrap.com', role: 'Dealer', status: 'Active', joinDate: '2023-09-21' },
        { id: 3, name: 'Sarah Smith', email: 'sarah@test.com', role: 'Customer', status: 'Inactive', joinDate: '2023-11-02' },
        { id: 4, name: 'Metal Works Ltd.', email: 'info@metalworks.com', role: 'Dealer', status: 'Pending', joinDate: '2023-11-28' },
        { id: 5, name: 'Mike Johnson', email: 'mike@example.com', role: 'Customer', status: 'Active', joinDate: '2023-12-05' },
    ]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would add a user to the backend
        alert("User added successfully! (Simulation)");
        handleCloseModal();
    };

    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const handleEditUser = (user) => {
        alert(`Edit feature for ${user.name} opening...`);
        handleOpenModal();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                    <p className="text-slate-500 text-sm">Manage platform users and roles</p>
                </div>
                <button
                    onClick={handleOpenModal}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center gap-2"
                >
                    <UserPlus className="w-4 h-4" />
                    Add New User
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                </div>
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option>All Roles</option>
                    <option>Customer</option>
                    <option>Dealer</option>
                    <option>Admin</option>
                </select>
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name / Email</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{user.role}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        user.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            'bg-slate-50 text-slate-600 border-slate-100'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{user.joinDate}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors ml-2"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">Add New User</h3>
                            <button onClick={handleCloseModal} className="text-slate-400 hover:text-red-500 transition-colors">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Enter full name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Enter email" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                                    <option>Customer</option>
                                    <option>Dealer</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 font-medium">Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Dealer Management Component ---
export const DealerManagement = () => {
    // Mock Dealers Data
    const [dealers, setDealers] = useState([
        { id: 101, name: 'Green Earth Recyclers', owner: 'Robert Fox', location: 'New York, NY', status: 'Verified', rating: 4.8 },
        { id: 102, name: 'City Scrap Metal', owner: 'Esther Howard', location: 'Chicago, IL', status: 'Pending', rating: 0 },
        { id: 103, name: 'EcoWaste Solutions', owner: 'Albert Flores', location: 'San Francisco, CA', status: 'Verified', rating: 4.5 },
        { id: 104, name: 'Rapid Recycling', owner: 'Arlene McCoy', location: 'Austin, TX', status: 'Blocked', rating: 3.2 },
    ]);

    const [selectedDealer, setSelectedDealer] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleViewDealer = (dealer) => {
        setSelectedDealer(dealer);
        setIsViewModalOpen(true);
    };

    const handleEditDealer = (dealer) => {
        setSelectedDealer(dealer);
        setIsEditModalOpen(true);
    };

    const handleSaveDealer = () => {
        // Here you would find 'selectedDealer.id' in 'dealers' and update it
        setDealers(dealers.map(d => d.id === selectedDealer.id ? selectedDealer : d));
        setIsEditModalOpen(false);
    };

    const handleExport = () => {
        const headers = ["Business", "Owner", "Location", "Status", "Rating"];
        const rows = dealers.map(d => [d.name, d.owner, d.location, d.status, d.rating].join(","));
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "dealers_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Dealer Management</h1>
                    <p className="text-slate-500 text-sm">Monitor and verify dealer accounts</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search dealers..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option>All Status</option>
                    <option>Verified</option>
                    <option>Pending</option>
                    <option>Blocked</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Business / Owner</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {dealers.map((dealer) => (
                            <tr key={dealer.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center font-bold text-teal-600">
                                            {dealer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{dealer.name}</div>
                                            <div className="text-xs text-slate-500">{dealer.owner}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{dealer.location}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 w-fit ${dealer.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        dealer.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            'bg-red-50 text-red-700 border-red-100'
                                        }`}>
                                        {dealer.status === 'Verified' ? <CheckCircle className="w-3 h-3" /> :
                                            dealer.status === 'Pending' ? <AlertTriangle className="w-3 h-3" /> :
                                                <XCircle className="w-3 h-3" />}
                                        {dealer.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-1">
                                        <span className="text-amber-400">★</span>
                                        <span>{dealer.rating || 'N/A'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors"
                                        title="View Details"
                                        onClick={() => handleViewDealer(dealer)}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors ml-2"
                                        title="Edit"
                                        onClick={() => handleEditDealer(dealer)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Dealer Modal */}
            {
                isViewModalOpen && selectedDealer && (
                    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden relative" onClick={e => e.stopPropagation()}>
                            <div className="flex justify-between items-center p-6 border-b border-slate-100">
                                <h3 className="text-lg font-bold text-slate-800">Dealer Details</h3>
                                <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                                    <XCircle className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-2xl font-bold text-teal-600">
                                        {selectedDealer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900">{selectedDealer.name}</h4>
                                        <p className="text-slate-500">{selectedDealer.owner}</p>
                                    </div>
                                    <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${selectedDealer.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                                        selectedDealer.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>{selectedDealer.status}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-400 uppercase font-semibold">Location</label>
                                        <p className="text-slate-700 font-medium">{selectedDealer.location}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-400 uppercase font-semibold">Rating</label>
                                        <div className="flex items-center gap-1">
                                            <span className="text-amber-400">★</span>
                                            <span className="text-slate-700 font-medium">{selectedDealer.rating}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-400 uppercase font-semibold">Dealer ID</label>
                                        <p className="text-slate-700 font-mono text-sm">#{selectedDealer.id}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 flex justify-end">
                                <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm">Close</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Edit Dealer Modal */}
            {
                isEditModalOpen && selectedDealer && (
                    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative" onClick={e => e.stopPropagation()}>
                            <div className="flex justify-between items-center p-6 border-b border-slate-100">
                                <h3 className="text-lg font-bold text-slate-800">Edit Dealer Status</h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                                    <XCircle className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                    <select
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                        value={selectedDealer.status}
                                        onChange={(e) => setSelectedDealer({ ...selectedDealer, status: e.target.value })}
                                    >
                                        <option value="Verified">Verified</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Update Rating</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                        value={selectedDealer.rating}
                                        onChange={(e) => setSelectedDealer({ ...selectedDealer, rating: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 flex justify-end gap-2">
                                <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-slate-500 hover:text-slate-700 font-medium text-sm">Cancel</button>
                                <button onClick={handleSaveDealer} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm">Save Changes</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

// --- Order Management Component ---
export const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Using dealer enpoint as it returns all orders from CSV
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

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleExport = () => {
        alert("Exporting Orders CSV...");
    };

    const parseCustomerName = (addrStr) => {
        try {
            return JSON.parse(addrStr)?.fullName || 'Guest';
        } catch {
            return 'Guest';
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
                    <p className="text-slate-500 text-sm">Monitor and track platform orders</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Cancelled</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Dealer</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.length === 0 ? (
                            <tr><td colSpan="7" className="px-6 py-4 text-center text-slate-500">No orders found.</td></tr>
                        ) : orders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{parseCustomerName(order.shipping_address)}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">Dealer #{order.dealer_id}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">₹{order.total_amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        order.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            order.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                'bg-slate-50 text-slate-700 border-slate-100'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors"
                                        onClick={() => handleViewOrder(order)}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* View Order Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">Order Details</h3>
                            <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-red-500 transition-colors">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between mb-8 bg-slate-50 p-4 rounded-lg">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Order ID</p>
                                    <p className="font-mono font-bold text-slate-800">{selectedOrder.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Date</p>
                                    <p className="font-medium text-slate-800">{selectedOrder.date}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Customer</h4>
                                    <p className="text-slate-700">{parseCustomerName(selectedOrder.shipping_address)}</p>
                                    <p className="text-sm text-slate-500">Verified Customer</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Dealer</h4>
                                    <p className="text-slate-700">Dealer #{selectedOrder.dealer_id}</p>
                                    <p className="text-sm text-slate-500">Premium Dealer</p>
                                </div>
                            </div>

                            <div className="border rounded-lg border-slate-200 overflow-hidden mb-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-4 py-3 font-medium text-slate-600">Item Description</th>
                                            <th className="px-4 py-3 font-medium text-slate-600 text-right">Quantity</th>
                                            <th className="px-4 py-3 font-medium text-slate-600 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {/* Simplified items view */}
                                        <tr>
                                            <td className="px-4 py-3 text-slate-800">Items (See raw data for details)</td>
                                            <td className="px-4 py-3 text-right text-slate-600">-</td>
                                            <td className="px-4 py-3 text-right font-medium text-slate-800">₹{selectedOrder.total_amount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedOrder.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                    }`}>{selectedOrder.status}</span>
                                <div className="text-right">
                                    <span className="text-slate-500 text-sm mr-2">Total Amount:</span>
                                    <span className="text-2xl font-bold text-slate-900">₹{selectedOrder.total_amount}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 flex justify-end">
                            <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Pickup Management Component ---
export const AdminPickups = () => {
    const [pickups, setPickups] = useState([]);
    const [selectedPickup, setSelectedPickup] = useState(null);

    useEffect(() => {
        fetchPickups();
    }, []);

    const fetchPickups = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/admin/pickups/');
            const data = await response.json();
            setPickups(data);
        } catch (error) {
            console.error('Error fetching pickups:', error);
        }
    };

    const handleViewPickup = (pickup) => {
        setSelectedPickup(pickup);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Pickup Management</h1>
                    <p className="text-slate-500 text-sm">Track and manage pickup requests</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-semibold text-emerald-700">Live Tracking Active</span>
                    </div>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-100 rounded-xl h-48 border border-slate-200 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=10&size=600x300&key=YOUR_API_KEY_HERE')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-slate-600 font-medium shadow-sm z-10 flex items-center gap-2">
                    <div className="relative">
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                    Live Map Visualization (Placeholder)
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pickup ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {pickups.map((pickup) => (
                            <tr key={pickup.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{pickup.id}</td>
                                <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-xs">{pickup.location}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    <div className="font-medium">{pickup.date}</div>
                                    <div className="text-xs text-slate-400">{pickup.time}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{pickup.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${pickup.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        pickup.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            pickup.status === 'In Transit' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                'bg-red-50 text-red-700 border-red-100'
                                        }`}>
                                        {pickup.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors"
                                        onClick={() => handleViewPickup(pickup)}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* View Pickup Modal */}
            {selectedPickup && (
                <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden relative" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">Pickup Details</h3>
                            <button onClick={() => setSelectedPickup(null)} className="text-slate-400 hover:text-red-500 transition-colors">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Mock Map */}
                        <div className="h-48 bg-slate-100 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=10&size=600x300&key=YOUR_API_KEY_HERE')] bg-cover bg-center opacity-50"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold text-slate-600 shadow-sm flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    Live Location Placeholder
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <div>
                                    <p className="text-sm text-slate-500">Pickup ID</p>
                                    <p className="font-bold text-slate-800">{selectedPickup.id}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedPickup.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                                    selectedPickup.status === 'In Transit' ? 'bg-amber-100 text-amber-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>{selectedPickup.status}</span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <div className="w-5 shrink-0 text-slate-400">📍</div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">Pickup Location</p>
                                        <p className="text-sm text-slate-600">{selectedPickup.location}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-5 shrink-0 text-slate-400">📅</div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">Scheduled Time</p>
                                        <p className="text-sm text-slate-600">{selectedPickup.date} at {selectedPickup.time}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-5 shrink-0 text-slate-400">📦</div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">Type</p>
                                        <p className="text-sm text-slate-600">{selectedPickup.type} Pickup</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 flex justify-end">
                            <button onClick={() => setSelectedPickup(null)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Product Management Component ---
export const ProductManagement = () => {
    const [pendingProducts, setPendingProducts] = useState([]);

    useEffect(() => {
        fetchPendingProducts();
    }, []);

    const fetchPendingProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/admin/products/?status=Pending');
            if (response.ok) {
                const data = await response.json();
                setPendingProducts(data);
            }
        } catch (error) {
            console.error("Error fetching pending products:", error);
        }
    };

    const handleApprove = async (id) => {
        if (window.confirm("Approve this product?")) {
            try {
                const response = await fetch(`http://localhost:8000/api/admin/products/${id}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'Active' })
                });
                if (response.ok) {
                    setPendingProducts(pendingProducts.filter(p => p.id !== id));
                    alert("Product Approved!");
                }
            } catch (error) {
                console.error("Error approving product:", error);
            }
        }
    };

    const handleReject = async (id) => {
        if (window.confirm("Reject this product?")) {
            try {
                const response = await fetch(`http://localhost:8000/api/admin/products/${id}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'Rejected' })
                });
                if (response.ok) {
                    setPendingProducts(pendingProducts.filter(p => p.id !== id));
                    alert("Product Rejected!");
                }
            } catch (error) {
                console.error("Error rejecting product:", error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Product Approvals</h1>
                    <p className="text-slate-500 text-sm">Review and approve dealer product listings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                        <div className="h-40 bg-slate-100 flex items-center justify-center text-slate-300">
                            <span className="text-4xl">📷</span>
                        </div>
                        <div className="p-4 flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-full">{product.category}</span>
                                <span className="text-xs text-slate-400">{product.submitted}</span>
                            </div>
                            <h3 className="font-bold text-slate-800 mb-1">{product.name}</h3>
                            <p className="text-sm text-slate-500 mb-4">By <span className="font-medium text-emerald-600">{product.dealer}</span></p>
                            <div className="font-bold text-lg text-slate-900 mb-4">{product.price}</div>

                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                <button
                                    className="py-2 px-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors"
                                    onClick={() => handleReject(product.id)}
                                >
                                    Reject
                                </button>
                                <button
                                    className="py-2 px-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-colors"
                                    onClick={() => handleApprove(product.id)}
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {pendingProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">All caught up!</h3>
                    <p className="text-slate-500">No pending products to review.</p>
                </div>
            )}
        </div>
    );
};

// --- Rates Management Component ---
export const RatesManagement = () => {
    const materials = [
        { id: 1, name: 'Iron', price: '32', unit: 'kg', trend: 'up' },
        { id: 2, name: 'Copper', price: '450', unit: 'kg', trend: 'down' },
        { id: 3, name: 'Aluminum', price: '105', unit: 'kg', trend: 'stable' },
        { id: 4, name: 'Plastic (PET)', price: '15', unit: 'kg', trend: 'up' },
        { id: 5, name: 'Newspaper', price: '12', unit: 'kg', trend: 'stable' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Rates Management</h1>
                    <p className="text-slate-500 text-sm">Set and update daily scrap material rates</p>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
                    Update All Rates
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Material Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Price (₹)</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Unit</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trend</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {materials.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            defaultValue={item.price}
                                            className="w-24 px-2 py-1 border border-slate-200 rounded text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">Per {item.unit}</td>
                                <td className="px-6 py-4">
                                    {item.trend === 'up' && <span className="text-emerald-600 text-xs font-medium flex items-center gap-1">▲ Up</span>}
                                    {item.trend === 'down' && <span className="text-red-600 text-xs font-medium flex items-center gap-1">▼ Down</span>}
                                    {item.trend === 'stable' && <span className="text-slate-400 text-xs font-medium flex items-center gap-1">● Stable</span>}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">Save</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Reports & Analytics Component ---
export const AdminReports = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [customReport, setCustomReport] = useState({
        type: 'Traffic Analysis',
        range: 'Last 7 Days',
        format: 'PDF'
    });

    const handleGenerateReport = (reportTitle) => {
        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            setIsGenerating(false);
            if (reportTitle.includes("Financial")) {
                downloadCSV("financial_report_2026.csv", "Revenue,Commissions,Payouts\n50000,2500,47500");
            } else if (reportTitle.includes("User")) {
                downloadCSV("user_growth.csv", "Date,New Users,Active Users\n2026-01-01,15,120");
            } else {
                downloadCSV("ops_metrics.csv", "Metric,Value\nAvg Pickup Time,24h\nCompletion Aaron,98%");
            }
            alert(`${reportTitle} has been generated and downloaded.`);
        }, 1500);
    };

    const handleCustomDownload = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            alert(`Custom Report (${customReport.type} - ${customReport.range}) exported as ${customReport.format}.`);
        }, 1500);
    };

    const downloadCSV = (filename, content) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/csv' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
                    <p className="text-slate-500 text-sm">Generate and view platform performance reports</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Financial Report', desc: 'Revenue, commissions, and payouts overview.', icon: '💰', color: 'bg-blue-50 text-blue-600' },
                    { title: 'User Growth', desc: 'New registrations, active users, and retention.', icon: '👥', color: 'bg-emerald-50 text-emerald-600' },
                    { title: 'Operational Metrics', desc: 'Order fulfillment times, pickup efficiency.', icon: '⚙️', color: 'bg-purple-50 text-purple-600' },
                ].map((report, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-emerald-500">
                        <div className={`w-12 h-12 rounded-lg ${report.color} flex items-center justify-center text-2xl mb-4`}>
                            {report.icon}
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">{report.title}</h3>
                        <p className="text-sm text-slate-500 mb-4">{report.desc}</p>
                        <button
                            onClick={() => handleGenerateReport(report.title)}
                            disabled={isGenerating}
                            className={`text-sm font-medium ${isGenerating ? 'text-slate-400' : 'text-emerald-600 hover:text-emerald-700'} flex items-center gap-1`}
                        >
                            {isGenerating ? 'Generating...' : 'Generate Report'} <span className="text-lg">›</span>
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Custom Report Generator</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Report Type</label>
                        <select
                            value={customReport.type}
                            onChange={(e) => setCustomReport({ ...customReport, type: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option>Traffic Analysis</option>
                            <option>Sales Performance</option>
                            <option>Dealer Activity</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Date Range</label>
                        <select
                            value={customReport.range}
                            onChange={(e) => setCustomReport({ ...customReport, range: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Custom Range</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Format</label>
                        <select
                            value={customReport.format}
                            onChange={(e) => setCustomReport({ ...customReport, format: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option>PDF</option>
                            <option>Excel (CSV)</option>
                        </select>
                    </div>
                    <button
                        onClick={handleCustomDownload}
                        disabled={isGenerating}
                        className={`px-4 py-2 ${isGenerating ? 'bg-slate-400' : 'bg-slate-800 hover:bg-slate-900'} text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2`}
                    >
                        <Download className="w-4 h-4" />
                        {isGenerating ? 'Processing...' : 'Download'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Platform Settings Component ---
export const AdminSettings = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Platform Settings</h1>
                    <p className="text-slate-500 text-sm">Configure global application settings</p>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* General Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">General Information</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name</label>
                                    <input type="text" defaultValue="Junk Dealer Marketplace" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
                                    <input type="email" defaultValue="support@junkdealer.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
                                <input type="tel" defaultValue="+91 98765 43210" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Fees & Commissions</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-800">Dealer Commission</p>
                                    <p className="text-xs text-slate-500">Percentage taken from each transaction</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="number" defaultValue="5" className="w-16 px-2 py-1 border border-slate-200 rounded text-center text-sm font-bold" />
                                    <span className="text-slate-600 font-bold">%</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-800">Minimum Withdrawal</p>
                                    <p className="text-xs text-slate-500">Minimum balance required for payouts</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-600 font-bold">₹</span>
                                    <input type="number" defaultValue="500" className="w-20 px-2 py-1 border border-slate-200 rounded text-center text-sm font-bold" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">System Preferences</h3>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-sm font-medium text-slate-700">Maintenance Mode</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </div>
                            </label>
                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-sm font-medium text-slate-700">Email Notifications</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Transactions Component ---
export const Transactions = () => {
    // Mock Transactions
    const transactions = [
        { id: 'TRX-1092', user: 'Green Earth Recyclers', type: 'Payout', amount: '-₹1,250.00', status: 'Processed', date: 'Oct 29, 2023' },
        { id: 'TRX-1093', user: 'John Doe', type: 'Payment', amount: '+₹45.00', status: 'Completed', date: 'Oct 28, 2023' },
        { id: 'TRX-1094', user: 'EcoWaste Solutions', type: 'Commission', amount: '+₹12.50', status: 'Completed', date: 'Oct 28, 2023' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
                    <p className="text-slate-500 text-sm">Financial history and audit logs</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User / Entity</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transactions.map((trx) => (
                            <tr key={trx.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-mono text-slate-500">{trx.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{trx.user}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{trx.type}</td>
                                <td className={`px-6 py-4 font-bold text-sm ${trx.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'}`}>{trx.amount}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                        {trx.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{trx.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
