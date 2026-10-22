import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Search, TrendingUp, DollarSign, Package, AlertCircle } from 'lucide-react';
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const Rates = () => {
    const { t } = useLanguage();
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/admin/rates/');
                if (!response.ok) {
                    throw new Error('Failed to fetch rates');
                }
                const data = await response.json();
                setRates(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching rates:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    const filteredRates = rates.filter(rate =>
        rate.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className=" pb-12">
                {/* Hero Section */}
                <div className="bg-slate-900 text-white py-12 mb-8">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-4">
                            <TrendingUp className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            {t('rates.title')}
                        </h1>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            {t('rates.subtitle')}
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mb-10 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            type="text"
                            placeholder="Search for materials (e.g. Copper, Iron)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-12 shadow-sm border-slate-200 focus:border-emerald-500 rounded-full"
                        />
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                            <p className="text-slate-500 font-medium">{t('rates.loading')}</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-red-200 shadow-sm max-w-lg mx-auto">
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Rates</h3>
                            <p className="text-slate-500">{t('rates.error')} {error}</p>
                        </div>
                    ) : filteredRates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredRates.map((rate) => (
                                <Card key={rate.id} className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="flex items-stretch h-full">
                                            {/* Color strip/Icon section */}
                                            <div className="w-24 bg-emerald-50 flex flex-col items-center justify-center p-4 border-r border-slate-100 group-hover:bg-emerald-100 transition-colors">
                                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                                                    <Package className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <div className="text-xs font-bold text-emerald-700 tracking-wider">
                                                    {rate.material.substring(0, 3).toUpperCase()}
                                                </div>
                                            </div>

                                            {/* Details section */}
                                            <div className="flex-1 p-5 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                                                            {rate.material}
                                                        </h3>
                                                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-0">
                                                            ₹{rate.price}/{rate.unit}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                                                        {rate.description}
                                                    </p>
                                                </div>

                                                <div className="pt-3 border-t border-slate-100">
                                                    <a href="/pickups" className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                                                        Sell this material <TrendingUp className="w-3 h-3 ml-1" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">No material found</h3>
                            <p className="text-slate-500">
                                We couldn't find any material matching "{searchTerm}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Rates;
