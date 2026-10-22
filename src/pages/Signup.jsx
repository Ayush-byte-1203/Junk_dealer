import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, User, Lock, Mail, Phone, MapPin, ArrowRight, Loader, UserPlus } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        location: '',
        role: 'customer' // Default role
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (role) => {
        setFormData({
            ...formData,
            role: role
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await register(formData);

            if (result.success) {
                // Determine redirection based on role (similar to Login)
                if (result.role === 'dealer') navigate('/dashboard');
                else navigate('/user-dashboard');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Visual Side (Left on Desktop, Top on Mobile) */}
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white md:w-2/5 flex flex-col justify-center items-center text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm shadow-inner">
                        <Recycle className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Join JunkDealer</h2>
                    <p className="text-teal-100 mb-6">Start recycling seamlessly or grow your scrap business today.</p>
                    <div className="text-sm bg-white/10 p-4 rounded-xl backdrop-blur-md">
                        <p className="font-semibold mb-1">Why Register?</p>
                        <ul className="text-left space-y-2 text-teal-50 list-disc pl-4 opacity-90">
                            <li>Instant Pickup Booking</li>
                            <li>Real-time Rate Cards</li>
                            <li>Track Your Earnings</li>
                        </ul>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 md:w-3/5">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-sm text-emerald-600 font-semibold hover:underline"
                        >
                            Sign In
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700 rounded-r">
                                {error}
                            </div>
                        )}

                        {/* Role Selection */}
                        <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                            <button
                                type="button"
                                onClick={() => handleRoleChange('customer')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${formData.role === 'customer'
                                        ? 'bg-white text-emerald-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <User className="w-4 h-4" /> User
                            </button>
                            <button
                                type="button"
                                onClick={() => handleRoleChange('dealer')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${formData.role === 'dealer'
                                        ? 'bg-white text-emerald-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <Recycle className="w-4 h-4" /> Dealer
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-600 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-600 ml-1">Username</label>
                                <div className="relative">
                                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                                        placeholder="john_doe"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {formData.role === 'dealer' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-600 ml-1">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                                            placeholder="9876543210"
                                            required={formData.role === 'dealer'}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-600 ml-1">Location / City</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                                            placeholder="Mumbai"
                                            required={formData.role === 'dealer'}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                                    placeholder="Create a strong password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create Account <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
