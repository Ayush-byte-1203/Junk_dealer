import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, ArrowRight, Loader, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(username, password);

            if (result.success) {
                if (result.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    setError('Access Denied: You do not have admin privileges.');
                    setLoading(false);
                }
            } else {
                setError(result.message);
                setLoading(false);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
            </div>

            <div className="relative w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-inner">
                        <Shield className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-slate-400">Secure access for administrators</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Admin ID</label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                                    <Shield className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-600"
                                    placeholder="Enter admin ID"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900/50 text-white pl-10 pr-4 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-600"
                                    placeholder="Enter access code"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-900/50 transition-all flex items-center justify-center gap-2 hover:translate-y-[-1px] active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Access Dashboard <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <div className="text-center">
                        <a href="/" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">
                            &larr; Return to Website
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
