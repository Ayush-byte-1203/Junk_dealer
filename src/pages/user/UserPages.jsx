import React from 'react';
import { MapPin, Calendar, Download, Camera } from 'lucide-react';

// --- My Pickups Component ---
export const MyPickups = () => {
    const pickups = [
        { id: 'PK-9024', type: 'Paper & Cardboard', quantity: '12 kg', time: 'Today, 2:00 PM', status: 'In Transit', location: 'Home (123 Main St)' },
        { id: 'PK-9021', type: 'E-Waste', quantity: '5 units', time: 'Jan 28, 2026', status: 'Completed', location: 'Home (123 Main St)' },
        { id: 'PK-9018', type: 'Metals (Iron)', quantity: '45 kg', time: 'Jan 20, 2026', status: 'Completed', location: 'Office (456 Tech Park)' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">My Pickups</h1>
                    <p className="text-slate-500 text-sm">Track your scheduled and past pickups</p>
                </div>
                <button onClick={() => window.location.href = '/schedule-pickup'} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm transition-colors">
                    + Schedule New Pickup
                </button>
            </div>

            <div className="space-y-4">
                {pickups.map((pickup) => (
                    <div key={pickup.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${pickup.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                            pickup.status === 'In Transit' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                            }`}>
                            <TruckIcon status={pickup.status} />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-slate-800">{pickup.type}</h3>
                                <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">{pickup.quantity}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {pickup.time}</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {pickup.location}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 md:border-l md:pl-6 border-slate-100">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${pickup.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                                pickup.status === 'In Transit' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                {pickup.status}
                            </span>
                            <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                <span className="sr-only">Details</span>
                                →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TruckIcon = ({ status }) => {
    if (status === 'Completed') return <span>✓</span>;
    if (status === 'In Transit') return <span>🚚</span>;
    return <span>📦</span>;
};

// --- My Earnings Component ---
// --- My Earnings Component ---
export const MyEarnings = () => {
    // Initial State from LocalStorage or Default Mock Data
    const [balance, setBalance] = React.useState(() => {
        const saved = localStorage.getItem('wallet_balance');
        return saved ? parseFloat(saved) : 1200.00;
    });

    const [transactions, setTransactions] = React.useState(() => {
        const saved = localStorage.getItem('wallet_transactions');
        return saved ? JSON.parse(saved) : [
            { id: 'TXN-8823', date: 'Jan 28, 2026', desc: 'Pickup Payment - #PK-9021', amount: 450.00, type: 'credit', status: 'Credited' },
            { id: 'TXN-8820', date: 'Jan 20, 2026', desc: 'Pickup Payment - #PK-9018', amount: 1250.00, type: 'credit', status: 'Credited' },
            { id: 'TXN-8801', date: 'Jan 15, 2026', desc: 'Wallet Withdrawal', amount: 500.00, type: 'debit', status: 'Processed' },
        ];
    });

    const [bankAccount, setBankAccount] = React.useState(() => {
        return localStorage.getItem('user_bank_account') || null;
    });

    const [loading, setLoading] = React.useState(false);

    // Persist to LocalStorage whenever state changes
    React.useEffect(() => {
        localStorage.setItem('wallet_balance', balance);
        localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
    }, [balance, transactions]);

    const handleWithdraw = () => {
        if (!bankAccount) {
            alert("Please add a bank account first to withdraw funds.");
            return;
        }

        const amountStr = prompt(`Enter amount to withdraw (Available: ₹${balance.toFixed(2)}):`);
        if (!amountStr) return;

        const amount = parseFloat(amountStr);

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        if (amount > balance) {
            alert("Insufficient balance!");
            return;
        }

        // Process Withdrawal
        setLoading(true);
        setTimeout(() => {
            const newBalance = balance - amount;
            const newTransaction = {
                id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                desc: 'Wallet Withdrawal',
                amount: amount,
                type: 'debit',
                status: 'Processing'
            };

            setBalance(newBalance);
            setTransactions([newTransaction, ...transactions]);
            setLoading(false);
            alert(`Withdrawal of ₹${amount.toFixed(2)} initiated successfully!`);
        }, 1500); // Simulate network delay
    };

    const handleAddBank = () => {
        if (bankAccount) {
            const confirmUpdate = window.confirm(`Current Bank Account: ${bankAccount}\n\nDo you want to update it?`);
            if (!confirmUpdate) return;
        }

        const accountNo = prompt("Enter Bank Account Number:");
        if (!accountNo) return;

        const ifsc = prompt("Enter IFSC Code:");
        if (!ifsc) return;

        const bankName = "HDFC Bank"; // Mock bank name detection
        const accountDetails = `${bankName} - ${accountNo.slice(-4)}`; // Save masked details

        setBankAccount(accountDetails);
        localStorage.setItem('user_bank_account', accountDetails);
        alert("Bank account added successfully!");
    };

    const formatCurrency = (val) => {
        return '₹' + val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-teal-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <p className="text-teal-200 mb-1">Total Wallet Balance</p>
                    <h2 className="text-4xl font-bold mb-6 text-white">{formatCurrency(balance)}</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={handleWithdraw}
                            disabled={loading || balance <= 0}
                            className={`flex-1 bg-white text-teal-900 py-2 rounded-lg font-bold text-sm hover:bg-teal-50 transition-colors ${loading ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {loading ? 'Processing...' : 'Withdraw'}
                        </button>
                        <button
                            onClick={handleAddBank}
                            className="flex-1 bg-teal-800 text-white py-2 rounded-lg font-bold text-sm hover:bg-teal-700 transition-colors"
                        >
                            {bankAccount ? 'Update Bank' : 'Add Bank'}
                        </button>
                    </div>
                    {bankAccount && (
                        <div className="mt-4 pt-4 border-t border-teal-800/50 flex items-center gap-2 text-xs text-teal-300">
                            <span>🏦</span> Linked: {bankAccount}
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
                    <h3 className="font-bold text-slate-800 mb-2">Earnings Summary</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">This Month</span>
                            <span className="font-bold text-slate-900">₹1,700.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Last Month</span>
                            <span className="font-bold text-slate-900">₹2,450.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Recycled Weight</span>
                            <span className="font-bold text-emerald-600">57 kg</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Transaction History</h3>
                    <button className="text-sm text-emerald-600 font-medium flex items-center gap-1 hover:underline">
                        <Download size={14} /> Statement
                    </button>
                </div>
                <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                    {transactions.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">No transactions yet</div>
                    ) : (
                        transactions.map((tx) => (
                            <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${tx.type === 'credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {tx.type === 'credit' ? '↓' : '↑'}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">{tx.desc}</p>
                                        <p className="text-xs text-slate-500">{tx.date} • {tx.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                        {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                                    </p>
                                    <p className={`text-xs capitalize ${tx.status === 'Processing' ? 'text-amber-500 font-medium' : 'text-slate-400'
                                        }`}>{tx.status}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Rate Card Component ---
export const RateCard = () => {
    const rates = [
        { material: 'Iron', price: '₹32', unit: 'kg', trend: 'up', color: 'orange', icon: 'Hammer' },
        { material: 'Copper', price: '₹450', unit: 'kg', trend: 'down', color: 'amber', icon: 'Cpu' },
        { material: 'Aluminum', price: '₹105', unit: 'kg', trend: 'stable', color: 'slate', icon: 'LayoutGrid' },
        { material: 'Newspaper', price: '₹12', unit: 'kg', trend: 'stable', color: 'blue', icon: 'Newspaper' },
        { material: 'Plastic (PET)', price: '₹15', unit: 'kg', trend: 'up', color: 'cyan', icon: 'Milk' },
        { material: 'E-Waste', price: '₹50-200', unit: 'unit', trend: 'stable', color: 'purple', icon: 'Monitor' },
        { material: 'Brass', price: '₹305', unit: 'kg', trend: 'up', color: 'yellow', icon: 'Trophy' },
        { material: 'Steel', price: '₹38', unit: 'kg', trend: 'stable', color: 'gray', icon: 'Square' }, // Fallback icon
        { material: 'Books', price: '₹14', unit: 'kg', trend: 'up', color: 'indigo', icon: 'Book' },
    ];

    // Helper to get color classes
    const getColorClasses = (color) => {
        const variants = {
            orange: 'bg-orange-50 text-orange-600 border-orange-100 hover:border-orange-200',
            amber: 'bg-amber-50 text-amber-600 border-amber-100 hover:border-amber-200',
            slate: 'bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200',
            blue: 'bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-200',
            cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100 hover:border-cyan-200',
            purple: 'bg-purple-50 text-purple-600 border-purple-100 hover:border-purple-200',
            yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100 hover:border-yellow-200',
            gray: 'bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-200',
            indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:border-indigo-200',
        };
        return variants[color] || variants.slate;
    };

    // Helper for icons (using lucide-react names, we'll need to mapping them if we import them dynamically or use a switch)
    // Since we can't dynamic import easily inside the loop without map, let's use a switch or just basic icons for now.
    // Ideally we import specific icons. I'll import a generic set for now at top of file, but for this snippet I will use a simple mapping if imports allow.
    // Current imports: MapPin, Calendar, Clock, Download, Search, Filter, Trash2, Camera, Edit2.
    // I need to add more imports to the top of the file separately.
    // For now, I will use a generic icon function.

    return (
        <div className="space-y-8">
            {/* Header Section */}
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Scrap Rate Card</h1>
                    <p className="text-slate-500 text-sm">Live market rates for recyclable materials in your area.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Last updated: {new Date().toLocaleDateString()}
                </div>
            </div>

            {/* Rates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rates.map((rate, i) => {
                    const colorClass = getColorClasses(rate.color);
                    return (
                        <div key={i} className={`relative group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${colorClass} bg-white border-slate-100 hover:bg-white`}>
                            {/* Decorative Background Blob */}
                            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-5 transition-opacity group-hover:opacity-10 ${rate.color === 'slate' ? 'bg-black' : `bg-${rate.color}-500`}`}></div>

                            <div className="flex justify-between items-start mb-6 relative">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${rate.color === 'slate' ? 'bg-slate-100' : `bg-${rate.color}-100`}`}>
                                    {/* Icon Placeholder - in real app use Lucide icon */}
                                    {i % 3 === 0 ? '🛠️' : i % 3 === 1 ? '📦' : '⚖️'}
                                </div>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${rate.trend === 'up' ? 'bg-emerald-100 text-emerald-700' :
                                    rate.trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    {rate.trend === 'up' ? '▲ Up' : rate.trend === 'down' ? '▼ Down' : '● Stable'}
                                </span>
                            </div>

                            <div className="relative">
                                <h3 className="text-lg font-bold text-slate-700 mb-1">{rate.material}</h3>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{rate.price}</span>
                                    <span className="text-sm font-medium text-slate-400">/ {rate.unit}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 text-sm text-slate-600 flex gap-4 leading-relaxed">
                <span className="text-2xl shrink-0">ℹ️</span>
                <p>
                    <strong>Note:</strong> Prices are subject to market fluctuations and may vary slightly based on the quality, quantity, and condition of your scrap.
                    Final valuation will be provided by the pickup agent at the time of collection.
                </p>
            </div>
        </div>
    );
};

// --- User Settings Component ---
// --- User Settings Component ---
export const UserSettings = () => {
    // Initial state from localStorage or defaults
    const [profile, setProfile] = React.useState(() => {
        const saved = localStorage.getItem('user_profile');
        return saved ? JSON.parse(saved) : {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+91 98765 43210',
            location: 'Mumbai, India',
            address: '123, Green Valley Apartments, Main Road, Andheri West, Mumbai - 400053'
        };
    });

    const [showSaveMsg, setShowSaveMsg] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user_profile', JSON.stringify(profile));

        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new CustomEvent('user-profile-updated'));

        setShowSaveMsg(true);
        setTimeout(() => setShowSaveMsg(false), 3000);
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            localStorage.clear();
            alert("Account deleted. Redirecting to home...");
            window.location.href = '/';
        }
    };

    return (
        <div className="max-w-3xl space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                {showSaveMsg && (
                    <div className="absolute top-0 left-0 w-full bg-emerald-500 text-white text-center py-2 text-sm font-bold animate-in slide-in-from-top-full">
                        Profile updated successfully! ✅
                    </div>
                )}

                <div className="flex items-center gap-6 mb-8 mt-2">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-4xl border-4 border-white shadow-sm overflow-hidden">
                            {/* In a real app, this would be an image tag */}
                            <span role="img" aria-label="user">👤</span>
                        </div>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition-colors">
                            <Camera size={14} />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">{profile.fullName}</h2>
                        <p className="text-slate-500">Recycler Account</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={profile.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Location / City</label>
                            <input
                                type="text"
                                name="location"
                                value={profile.location}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Saved Address</label>
                        <textarea
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24 transition-all"
                        ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 shadow-sm shadow-emerald-200 active:scale-95 transform transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-red-800">Delete Account</h3>
                    <p className="text-sm text-red-600 mt-1">Permanently remove your account and data.</p>
                </div>
                <button
                    onClick={handleDeleteAccount}
                    className="text-red-600 font-medium text-sm hover:underline hover:text-red-800 transition-colors"
                >
                    Deactivate my account
                </button>
            </div>
        </div>
    );
};
