import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dealer.css';
import LanguageSelector from '../../components/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

const dummyRevenueData = [
    { name: '1 Feb', revenue: 4000 },
    { name: '5 Feb', revenue: 3000 },
    { name: '10 Feb', revenue: 5000 },
    { name: '15 Feb', revenue: 2780 },
    { name: '20 Feb', revenue: 1890 },
    { name: '25 Feb', revenue: 2390 },
    { name: '28 Feb', revenue: 3490 },
];

const dummyMaterialData = [
    { name: 'Iron', value: 400 },
    { name: 'Plastic', value: 300 },
    { name: 'Copper', value: 300 },
    { name: 'Paper', value: 200 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

const DealerDashboard = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleExportReport = () => {
        // Create CSV content from dummy data for demonstration
        const headers = ['Date', 'Revenue'];
        const csvContent = [
            headers.join(','),
            ...dummyRevenueData.map(row => `${row.name},${row.revenue}`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'sales_report.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="dealer-container">
            <div className="dealer-header">
                <div>
                    <h1>{t('sidebar.dashboard')}</h1>
                    <p>Manage your business operations</p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <LanguageSelector />
                </div>
            </div>

            <div className="dealer-grid">
                {/* Revenue Analytics */}
                <div className="dealer-card">
                    <div className="card-header">
                        <h3>📈 Revenue Analytics (Last 30 Days)</h3>
                        <select className="card-select">
                            <option>Last 30 Days</option>
                            <option>Last 6 Months</option>
                        </select>
                    </div>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={dummyRevenueData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Material Distribution */}
                <div className="dealer-card">
                    <h3>📊 Material Distribution</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={dummyMaterialData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dummyMaterialData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions" style={{ justifyContent: 'center' }}>
                <button className="action-btn primary" onClick={() => navigate('/add-product')}>
                    <span>➕</span> Add New Product
                </button>
                <button className="action-btn" onClick={() => navigate('/dealer-orders')}>
                    <span>📋</span> View Orders
                </button>
                <button className="action-btn" onClick={handleExportReport}>
                    <span>📊</span> Export Sales Report
                </button>
                <button className="action-btn" onClick={() => alert('Bulk Upload feature is coming soon!')}>
                    <span>📦</span> Bulk Upload Products
                </button>
            </div>

            {/* Recent Activities */}
            <div className="dealer-card" style={{ marginTop: '2rem' }}>
                <div className="card-header" style={{ marginBottom: '1rem' }}>
                    <h3>🕒 Recent Activities</h3>
                    <button style={{ color: '#10b981', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>View All</button>
                </div>

                <div className="activities-list">
                    {/* Activity Item 1 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            <span>💰</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>New Order Received</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Order #ORD-2024-001 from Rajesh Kumar</p>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>2 mins ago</span>
                    </div>

                    {/* Activity Item 2 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            <span>⚠️</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>Stock Warning</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Iron scrap is running low (Current: 50kg)</p>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>2 hours ago</span>
                    </div>

                    {/* Activity Item 3 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            <span>⭐</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>New Review</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Received 5-star rating from Amit Patel</p>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>1 day ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerDashboard;
