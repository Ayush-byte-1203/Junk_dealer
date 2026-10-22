import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, User, Lock, ArrowRight, Loader } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine where to redirect after login (default to role-based dashboard)
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay for better UX
        setTimeout(() => {
            const result = login(username, password);

            if (result.success) {
                // Redirect based on role
                if (result.role === 'admin') navigate('/admin-dashboard');
                else if (result.role === 'dealer') navigate('/dashboard');
                else if (result.role === 'customer') navigate('/user-dashboard');
                else navigate(from);
            } else {
                setError(result.message);
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm mb-4">
                        <Recycle className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-teal-100">Sign in to access your dashboard</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">Username / ID</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            Don't have an account? <Link to="/signup" className="font-bold text-emerald-600 hover:underline">Register Now</Link>
                        </p>

                        {/* Demo Credentials Hint */}
                        <div className="mt-6 p-4 bg-slate-50 rounded-xl text-xs text-left text-slate-500 space-y-1">
                            <p className="font-bold text-slate-700 mb-2 uppercase tracking-wide">Demo Credentials:</p>
                            <div className="flex justify-between"><span>User:</span> <code className="bg-slate-200 px-1 rounded">user / user</code></div>
                            <div className="flex justify-between"><span>Dealer:</span> <code className="bg-slate-200 px-1 rounded">dealer / dealer</code></div>
                            <div className="flex justify-between"><span>Admin:</span> <code className="bg-slate-200 px-1 rounded">admin / admin</code></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
