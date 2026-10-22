import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Calculator, Plus, Trash2, RefreshCw, Save } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

const ScrapCalculator = () => {
    const { t } = useLanguage();
    const [rates, setRates] = useState([]);
    const [items, setItems] = useState([{ materialId: '', weight: '' }]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch rates for the dropdown
        const fetchRates = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/admin/rates/');
                if (response.ok) {
                    const data = await response.json();
                    setRates(data);
                }
            } catch (err) {
                console.error("Failed to fetch rates for calculator", err);
                // Fallback mock data if API fails
                setRates([
                    { id: 1, material: 'Iron', price: 32, unit: 'kg' },
                    { id: 2, material: 'Copper', price: 450, unit: 'kg' },
                    { id: 3, material: 'Aluminum', price: 105, unit: 'kg' },
                    { id: 4, material: 'Plastic', price: 15, unit: 'kg' },
                    { id: 5, material: 'Newspaper', price: 12, unit: 'kg' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    }, []);

    const addItem = () => {
        setItems([...items, { materialId: '', weight: '' }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => {
            const rate = rates.find(r => r.id.toString() === item.materialId.toString());
            const price = rate ? parseFloat(rate.price) : 0;
            const weight = parseFloat(item.weight) || 0;
            return acc + (price * weight);
        }, 0);
    };

    const total = calculateTotal();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pb-12">
                {/* Hero Section */}
                <div className="bg-slate-900 text-white py-12 mb-8">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-4">
                            <Calculator className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Scrap Value Calculator
                        </h1>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            Estimate the value of your scrap materials instantly.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Calculator Form */}
                        <div className="md:col-span-2 space-y-6">
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle>Calculate Earning</CardTitle>
                                    <CardDescription>Add materials and weights to see your potential earnings.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {items.map((item, index) => (
                                            <div key={index} className="flex gap-4 items-start animate-fadeIn">
                                                <div className="flex-1">
                                                    <select
                                                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                                                        value={item.materialId}
                                                        onChange={(e) => updateItem(index, 'materialId', e.target.value)}
                                                    >
                                                        <option value="">Select Material</option>
                                                        {rates.map(rate => (
                                                            <option key={rate.id} value={rate.id}>
                                                                {rate.material} (₹{rate.price}/{rate.unit})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="w-32">
                                                    <Input
                                                        type="number"
                                                        placeholder="Weight (kg)"
                                                        value={item.weight}
                                                        onChange={(e) => updateItem(index, 'weight', e.target.value)}
                                                        min="0"
                                                    />
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-slate-400 hover:text-red-500"
                                                    onClick={() => removeItem(index)}
                                                    disabled={items.length === 1}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}

                                        <Button onClick={addItem} variant="outline" className="w-full border-dashed border-slate-300 text-slate-600 hover:border-emerald-500 hover:text-emerald-600">
                                            <Plus className="w-4 h-4 mr-2" /> Add Another Item
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Summary Card */}
                        <div className="md:col-span-1">
                            <Card className="border-slate-200 bg-slate-900 text-white sticky top-24">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-slate-100">Estimated Value</CardTitle>
                                    <CardDescription className="text-slate-400">Total earning potential</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">
                                        ₹{total.toFixed(2)}
                                    </div>
                                    <p className="text-sm text-slate-400 mb-6">
                                        *Prices are estimates based on standard rates. Final value may vary based on quality.
                                    </p>

                                    <div className="space-y-3">
                                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                                            <Save className="w-4 h-4 mr-2" /> Save Estimate
                                        </Button>
                                        <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white" onClick={() => setItems([{ materialId: '', weight: '' }])}>
                                            <RefreshCw className="w-4 h-4 mr-2" /> Reset
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tips */}
                            <div className="mt-6 bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pro Tip
                                </h4>
                                <p className="text-sm text-slate-600">
                                    Segregate your waste (e.g., separate PET bottles from hard plastic) to get the best rates from dealers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ScrapCalculator;
