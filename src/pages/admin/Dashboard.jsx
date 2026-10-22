import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Admin.css';

const AdminDashboard = () => {
    const [timeRange, setTimeRange] = useState('30 Days');

    // Sample Data based on range
    const data24h = [
        { name: '00:00', value: 120 }, { name: '04:00', value: 80 },
        { name: '08:00', value: 250 }, { name: '12:00', value: 310 },
        { name: '16:00', value: 280 }, { name: '20:00', value: 190 },
        { name: '23:59', value: 150 },
    ];

    const data7d = [
        { name: 'Mon', value: 2400 }, { name: 'Tue', value: 1398 },
        { name: 'Wed', value: 9800 }, { name: 'Thu', value: 3908 },
        { name: 'Fri', value: 4800 }, { name: 'Sat', value: 3800 },
        { name: 'Sun', value: 4300 },
    ];

    const data30d = [
        { name: '1 Feb', value: 4000 }, { name: '5 Feb', value: 3000 },
        { name: '10 Feb', value: 2000 }, { name: '15 Feb', value: 2780 },
        { name: '20 Feb', value: 1890 }, { name: '25 Feb', value: 2390 },
        { name: '28 Feb', value: 3490 },
    ];

    const getCurrentData = () => {
        switch (timeRange) {
            case '24 Hours': return data24h;
            case '7 Days': return data7d;
            case '30 Days': return data30d;
            default: return data30d;
        }
    };

    const handleTimeChange = (e) => {
        const val = e.target.value;
        if (val === 'Custom Date') {
            alert('Custom Date Picker Feature Coming Soon!');
            return;
        }
        setTimeRange(val);
    };

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue', value: '₹124,500', icon: '💰', change: '+12.5%', trend: 'up' },
                    { label: 'Active Users', value: '45,231', icon: '👥', change: '+8.2%', trend: 'up' },
                    { label: 'Verified Dealers', value: '1,205', icon: '🏭', change: '+23', trend: 'up' },
                    { label: 'Pending Orders', value: '342', icon: '📦', change: '-5', trend: 'down' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl">{stat.icon}</span>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
                        <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <span>📈</span> Platform Growth
                        </h3>
                        <select
                            className="text-sm border-slate-200 rounded-lg p-1.5 focus:ring-emerald-500 cursor-pointer outline-none bg-white border"
                            value={timeRange}
                            onChange={handleTimeChange}
                        >
                            <option value="24 Hours">Last 24 Hours</option>
                            <option value="7 Days">Last 7 Days</option>
                            <option value="30 Days">Last 30 Days</option>
                            <option value="Custom Date">Custom Date</option>
                        </select>
                    </div>
                    <div className="h-64 chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={getCurrentData()} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#10b981' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <span>💰</span> Revenue Distribution
                        </h3>
                    </div>
                    <div className="h-64 flex flex-col justify-center gap-4">
                        {[
                            { label: 'Commission Fees', width: '75%', color: 'bg-teal-500', value: '₹93,375' },
                            { label: 'Premium Subscriptions', width: '15%', color: 'bg-blue-500', value: '₹18,675' },
                            { label: 'Ad Revenue', width: '10%', color: 'bg-amber-500', value: '₹12,450' },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-slate-700">{item.label}</span>
                                    <span className="font-bold text-slate-900">{item.value}</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <span>🔔</span> Recent Activity
                    </h3>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                    {[
                        { icon: '🆕', text: 'New user registration: Priya Sharma', time: '5 mins ago', type: 'user' },
                        { icon: '📦', text: 'New order #ORD176868360815 received from Green Earth Recyclers', time: '12 mins ago', type: 'order' },
                        { icon: '✅', text: 'Dealer verified: Green Earth Recyclers', time: '1 hour ago', type: 'dealer' },
                        { icon: '💰', text: 'Payment processed for Order #ORD176833800815', time: '2 hours ago', type: 'payment' },
                        { icon: '⚠️', text: 'High volume alert: Copper prices updated', time: '3 hours ago', type: 'alert' },
                    ].map((activity, i) => (
                        <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                                {activity.icon}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-800">{activity.text}</p>
                                <p className="text-xs text-slate-500">{activity.time}</p>
                            </div>
                            <button className="text-slate-400 hover:text-emerald-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center gap-2 text-center group">
                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" x2="20" y1="8" y2="14" /><line x1="23" x2="17" y1="11" y2="11" /></svg>
                    </span>
                    <span className="font-semibold text-slate-700">Manage Users</span>
                </button>
                <button className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center gap-2 text-center group">
                    <span className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
                    </span>
                    <span className="font-semibold text-slate-700">Export Data</span>
                </button>
                <button className="p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-500 hover:shadow-md transition-all flex flex-col items-center gap-2 text-center group">
                    <span className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                    </span>
                    <span className="font-semibold text-slate-700">View Reports</span>
                </button>
                <button className="p-4 bg-white border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all flex flex-col items-center gap-2 text-center group">
                    <span className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                    </span>
                    <span className="font-semibold text-slate-700">Settings</span>
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
