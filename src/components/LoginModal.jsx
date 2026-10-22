import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, User, Lock, ArrowRight, Loader, X } from 'lucide-react';

const LoginModal = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDealer, setIsDealer] = useState(false);
    const { login, isLoginModalOpen, closeLoginModal } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(username, password);

            if (result.success) {
                // RESTRICT ADMIN LOGIN
                if (result.role === 'admin') {
                    setError('Admin access is restricted. Please use the Admin Portal.');
                    setLoading(false);
                    return;
                }

                // DEALER CHECK VALIDATION
                if (isDealer && result.role !== 'dealer') {
                    setError('This account is not a registered Dealer account.');
                    setLoading(false);
                    return;
                }

                setLoading(false); // Stop loading before navigation
                // Redirect based on role
                if (result.role === 'dealer') navigate('/dashboard');
                else navigate('/user-dashboard');

                // Modal closes automatically via context update
            } else {
                setError(result.message);
                setLoading(false);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
            setLoading(false);
        }
    };

    if (!isLoginModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={closeLoginModal}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm mb-4 border border-white/30 shadow-inner">
                            <Recycle className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
                        <p className="text-teal-100 text-sm">Sign in to access your dashboard</p>
                    </div>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700 rounded-r">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 ml-1">Username / ID</label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-focus-within:bg-emerald-600 group-focus-within:text-white transition-colors">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-focus-within:bg-emerald-600 group-focus-within:text-white transition-colors">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Dealer Checkbox */}
                            <div className="flex items-center ml-1">
                                <input
                                    type="checkbox"
                                    id="dealer-login"
                                    checked={isDealer}
                                    onChange={(e) => setIsDealer(e.target.checked)}
                                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                />
                                <label htmlFor="dealer-login" className="ml-2 text-sm text-slate-600 font-medium cursor-pointer select-none">
                                    Login as Dealer
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-500 mb-4">
                            Don't have an account?
                            <button
                                onClick={() => {
                                    closeLoginModal();
                                    navigate('/signup');
                                }}
                                className="font-bold text-emerald-600 hover:underline ml-1"
                            >
                                Register Now
                            </button>
                        </p>
                        <p className="text-xs text-slate-400 mb-2">
                            Use demo credentials
                        </p>
                        <div className="flex gap-2 justify-center text-xs">
                            <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 font-mono">user</span>
                            <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 font-mono">dealer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
