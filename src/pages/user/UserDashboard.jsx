import React, { useState, useEffect } from 'react';
import { Wallet, Truck, Leaf, Award, ArrowUpRight, ArrowRight, X, Droplets, Zap, Wind, TreeDeciduous } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [showReport, setShowReport] = useState(false);
    const [stats, setStats] = useState({
        points: 0,
        level: 'Bronze',
        nextLevel: 'Silver',
        progress: 0,
        trees: 0,
        water: 0,
        co2: 0,
        energy: 0
    });
    const [fact, setFact] = useState('');
    const [userName, setUserName] = useState('John'); // Default

    const facts = [
        "Recycling one ton of paper saves 17 trees, 7,000 gallons of water, and 3 cubic yards of landfill space!",
        "Recycling a single aluminum can saves enough energy to power a TV for 3 hours.",
        "Glass can be recycled endlessly with no loss in quality or purity.",
        "Recycling plastic water bottles saves oil and reduces greenhouse gas emissions.",
        "E-waste contains precious metals like gold and silver that can be recovered and reused."
    ];

    useEffect(() => {
        // Load user name
        const loadName = () => {
            const saved = localStorage.getItem('user_profile');
            if (saved) {
                const profile = JSON.parse(saved);
                setUserName(profile.fullName ? profile.fullName.split(' ')[0] : 'John');
            }
        };
        loadName();
        // Listen for updates
        window.addEventListener('user-profile-updated', loadName);

        // Load random fact
        setFact(facts[Math.floor(Math.random() * facts.length)]);

        // Calculate Stats from LocalStorage (Mocking logic based on pickups)
        const savedPickups = JSON.parse(localStorage.getItem('pickups') || '[]');
        const pickupCount = savedPickups.length + 2; // +2 for mock initial data
        const totalWeight = savedPickups.reduce((acc, p) => acc + (parseFloat(p.weight) || 0), 57); // 57 default mock

        // Impact Formulas (approximate)
        const points = totalWeight * 10 + (pickupCount * 50);

        let level = 'Bronze';
        let nextLevel = 'Silver';
        let levelThreshold = 1000;

        if (points > 5000) { level = 'Gold'; nextLevel = 'Platinum'; levelThreshold = 10000; }
        else if (points > 2500) { level = 'Silver'; nextLevel = 'Gold'; levelThreshold = 5000; }
        else if (points > 1000) { level = 'Bronze'; nextLevel = 'Silver'; levelThreshold = 2500; }

        const progress = Math.min((points / levelThreshold) * 100, 100);

        setStats({
            points,
            level,
            nextLevel,
            progress,
            trees: (totalWeight * 0.017).toFixed(1), // 1 ton (1000kg) = 17 trees => 1kg = 0.017
            water: (totalWeight * 26).toFixed(0), // 1 ton = 7000 gal => 1kg = 7 gal (approx for mixed)
            co2: (totalWeight * 2.5).toFixed(1), // Average kg CO2 saved per kg recycled
            energy: (totalWeight * 4).toFixed(1) // kWh
        });

    }, []);

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Hello, {userName}! 👋</h1>
                    <p className="text-slate-500">Welcome back to your recycling dashboard.</p>
                </div>
                <button
                    onClick={() => navigate('/schedule-pickup')}
                    className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-2"
                >
                    <Truck size={18} />
                    Schedule Pickup
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Earnings', value: '₹12,450', icon: Wallet, color: 'bg-emerald-500', trend: '+12%', path: '/my-earnings' },
                    { label: 'Pending Pickups', value: '2', icon: Truck, color: 'bg-blue-500', trend: 'Active', path: '/pickups' },
                    { label: 'CO2 Saved', value: `${stats.co2} kg`, icon: Leaf, color: 'bg-teal-500', trend: 'High', path: null },
                    { label: 'Recycling Score', value: stats.points.toLocaleString(), icon: Award, color: 'bg-amber-500', trend: stats.level, path: null },
                ].map((stat, index) => (
                    <div
                        key={index}
                        onClick={() => stat.path && navigate(stat.path)}
                        className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow ${stat.path ? 'cursor-pointer' : ''}`}
                    >
                        <div className={`w-14 h-14 rounded-xl ${stat.color} bg-opacity-10 flex items-center justify-center text-2xl`}>
                            <stat.icon className={`w-7 h-7 ${stat.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                                <ArrowUpRight size={12} /> {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800 text-lg">Recent ♻️ Activity</h3>
                        <button
                            onClick={() => navigate('/pickups')}
                            className="text-emerald-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                        >
                            View All <ArrowRight size={16} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: 'Payment Received', desc: '₹450 credited to wallet', time: '2 hours ago', icon: '💰', color: 'bg-emerald-100 text-emerald-700' },
                            { title: 'Pickup Completed', desc: 'Newspapers (12kg) collected', time: 'Yesterday', icon: '✅', color: 'bg-blue-100 text-blue-700' },
                            { title: 'Pickup Scheduled', desc: 'Electronics cleanup drive', time: '2 days ago', icon: '📅', color: 'bg-amber-100 text-amber-700' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-xl`}>
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </div>
                                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Impact Card */}
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden group flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

                    <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">Did you know? <span className="animate-bounce">🌱</span></h3>
                        <p className="text-emerald-100 mb-6 text-sm leading-relaxed min-h-[60px]">
                            {fact}
                        </p>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-emerald-200 text-sm font-medium">Your Impact Level</span>
                                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">{stats.level}</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-2 mb-2 overflow-hidden">
                                <div className="bg-emerald-300 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: `${stats.progress}%` }}></div>
                            </div>
                            <p className="text-xs text-emerald-200">
                                {(5000 - stats.points > 0) ? `${(5000 - stats.points).toLocaleString()} pts to ${stats.nextLevel}` : 'Max Level Reached! 🏆'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowReport(true)}
                        className="w-full mt-6 bg-white text-emerald-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm active:scale-95 transform duration-150"
                    >
                        View Environmental Report
                    </button>
                </div>
            </div>

            {/* Environmental Report Modal */}
            {showReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                        <div className="bg-emerald-600 p-6 text-white relative">
                            <button
                                onClick={() => setShowReport(false)}
                                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-bold">Environmental Impact Report</h2>
                            <p className="text-emerald-100 opacity-90">Your verified sustainability contribution</p>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Droplets size={20} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-800">{stats.water}</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Gallons Water Saved</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-center">
                                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <TreeDeciduous size={20} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-800">{stats.trees}</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Trees Saved</p>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 text-center">
                                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Zap size={20} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-800">{stats.energy} <span className="text-sm text-slate-400">kWh</span></h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Energy Conserved</p>
                                </div>
                                <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 text-center">
                                    <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Wind size={20} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-800">{stats.co2} <span className="text-sm text-slate-400">kg</span></h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">CO2 Avoided</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                                <p className="text-slate-600 text-sm">You are in the top <span className="text-emerald-600 font-bold">15%</span> of eco-contributors in your city! 🌟</p>
                            </div>

                            <button
                                onClick={() => setShowReport(false)}
                                className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
                            >
                                Close Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
