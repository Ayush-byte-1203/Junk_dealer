import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Calendar, Clock, MapPin, Weight, Info, Truck, ChevronRight, ArrowLeft, Camera, X, Package, CheckCircle, Scale, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

// Helper to get readable label
const getMaterialLabel = (value) => {
    const map = {
        'paper': 'Paper & Cardboard',
        'plastic': 'Plastic',
        'metal': 'Metals (Iron, etc)',
        'ewaste': 'E-Waste',
        'glass': 'Glass',
        'other': 'Other'
    };
    return map[value] || value;
};

// Rates per kg (approximate)
const MATERIAL_RATES = {
    'paper': 12,
    'plastic': 15,
    'metal': 35, // Average of Iron/Steel
    'ewaste': 100, // Average per unit/kg
    'glass': 2,
    'other': 0
};

const SchedulePickup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        scrapType: '',
        weight: '',
        date: '',
        time: '',
        address: '',
        instructions: ''
    });
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (e) => {
        e.stopPropagation();
        setPreviewImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handlePickupSuccess = async (paymentId) => {
        const pickupCharge = 40;
        let apiData = {};

        // Prepare Data for API
        if (location.state?.cartItems) {
            const items = location.state.cartItems;
            apiData = {
                user_id: user?.id || 1, // Default to 1 if guest
                dealer_id: 1, // Default dealer
                items: JSON.stringify(items.map(i => `${i.name} (x${i.quantity})`)), // Simple string overview
                total_weight: 0, // Cart items might not have weight
                address: formData.address,
                notes: `Time: ${formData.time}`,
                scheduled_date: formData.date
            };
        } else {
            apiData = {
                user_id: user?.id || 1,
                dealer_id: 1,
                items: formData.scrapType,
                total_weight: formData.weight,
                address: formData.address,
                notes: `Time: ${formData.time}`,
                scheduled_date: formData.date
            };
        }

        try {
            // Save to Backend
            const response = await fetch('http://localhost:8000/api/user/pickups/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData)
            });

            if (!response.ok) {
                console.error("Failed to save to backend");
                // Fallback to storing locally if backend fails? Or just alert?
                // For now, let's proceed but warn.
            }
        } catch (error) {
            console.error("API Error", error);
        }

        // Keep LocalStorage for fallback/UI (optional, but good for immediate feedback)
        let newPickup = {
            id: `PKP-${Date.now()}`,
            status: 'Scheduled',
            ...formData,
            paymentId,
            timestamp: Date.now()
        };
        // ... (rest of local storage logic if needed, but we rely on backend now)
        // Actually, let's keep the user redirection logic

        if (location.state?.cartItems) {
            localStorage.removeItem('cart_items');
            window.dispatchEvent(new CustomEvent('cart-updated'));
        }

        setLoading(false);
        alert(`Pickup Scheduled Successfully! 🚚\nA dealer will contact you soon for the pickup.`);
        navigate('/pickups');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // No payment required - users are SELLING scrap, not buying
        // They will be credited after pickup completion
        try {
            await handlePickupSuccess('NO_PAYMENT_REQUIRED');
        } catch (error) {
            setLoading(false);
            alert('Failed to schedule pickup. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-10 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl shadow-sm mb-2 transform rotate-3 hover:rotate-6 transition-transform">
                        <Truck className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Schedule a Pickup</h1>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto">
                        Ready to recycle? Fill in the details below and a verified dealer will pick up your scrap.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

                    {/* Progress / Step Indicator (Visual only for now) */}
                    <div className="bg-slate-50/50 border-b border-slate-100 p-6 md:px-10 flex items-center gap-3 text-sm font-medium text-slate-500">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white text-xs">1</span>
                        <span className="text-emerald-900">Pickup Details</span>
                        <span className="h-px w-8 bg-slate-300 mx-2"></span>
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-500 text-xs">2</span>
                        <span>Confirm</span>
                    </div>

                    <div className="p-6 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Section 1: What & How Much */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                                    <Package className="w-5 h-5 text-emerald-500" />
                                    What are you selling?
                                </h3>

                                {location.state?.cartItems ? (
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-semibold text-slate-700">Selected Cart Items</h4>
                                            <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                                {location.state.cartItems.length} items
                                            </span>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            {location.state.cartItems.map(item => (
                                                <div key={item.id} className="flex justify-between text-sm">
                                                    <span className="text-slate-600">{item.name} (x{item.quantity})</span>
                                                    <span className="font-medium text-slate-900">₹{(item.price * item.quantity).toFixed(0)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-slate-800">
                                            <span>Total Estimated Value</span>
                                            <span>₹{location.state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(0)}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2 italic">* Weights will be verified at pickup.</p>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2.5">
                                            <Label htmlFor="scrapType" className="text-slate-700">Scrap Material</Label>
                                            <Select
                                                value={formData.scrapType}
                                                onValueChange={(val) => handleSelectChange('scrapType', val)}
                                            >
                                                <SelectTrigger id="scrapType" className="h-12 bg-slate-50 border-slate-200 focus:ring-emerald-500/20">
                                                    {/* Display correct label manually for now due to custom Select limitations */}
                                                    <span>{getMaterialLabel(formData.scrapType) || "Select type..."}</span>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="paper">Paper & Cardboard</SelectItem>
                                                    <SelectItem value="plastic">Plastic</SelectItem>
                                                    <SelectItem value="metal">Metals (Iron, etc)</SelectItem>
                                                    <SelectItem value="ewaste">E-Waste</SelectItem>
                                                    <SelectItem value="glass">Glass</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2.5">
                                            <Label htmlFor="weight" className="text-slate-700">Estimated Weight (kg)</Label>
                                            <div className="relative group">
                                                <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                                <Input
                                                    id="weight"
                                                    name="weight"
                                                    placeholder="e.g. 15"
                                                    className="pl-12 h-12 bg-slate-50 border-slate-200 focus:ring-emerald-500/20"
                                                    value={formData.weight}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 2: When & Where */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                                    <Clock className="w-5 h-5 text-emerald-500" />
                                    When & Where?
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2.5">
                                        <Label htmlFor="date" className="text-slate-700">Preferred Date</Label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                            <Input
                                                id="date"
                                                name="date"
                                                type="date"
                                                className="pl-12 h-12 bg-slate-50 border-slate-200 focus:ring-emerald-500/20"
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <Label htmlFor="time" className="text-slate-700">Preferred Time</Label>
                                        <Select
                                            value={formData.time}
                                            onValueChange={(val) => handleSelectChange('time', val)}
                                        >
                                            <SelectTrigger id="time" className="h-12 bg-slate-50 border-slate-200 focus:ring-emerald-500/20">
                                                <span>{formData.time ? formData.time.charAt(0).toUpperCase() + formData.time.slice(1) : "Select time slot..."}</span>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</SelectItem>
                                                <SelectItem value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</SelectItem>
                                                <SelectItem value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <Label htmlFor="address" className="text-slate-700">Pickup Address</Label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                        <Textarea
                                            id="address"
                                            name="address"
                                            placeholder="House No, Street, Landmark, City..."
                                            className="pl-12 min-h-[100px] bg-slate-50 border-slate-200 focus:ring-emerald-500/20 resize-none pt-3.5"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 3: Photos */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                                    <Camera className="w-5 h-5 text-emerald-500" />
                                    Add Photos (Optional)
                                </h3>
                                <div className="space-y-2.5">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />

                                    {!previewImage ? (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:bg-slate-50 hover:border-emerald-300 transition-all cursor-pointer group"
                                        >
                                            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform bg-slate-50 group-hover:bg-emerald-50">
                                                <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-500" />
                                            </div>
                                            <p className="text-sm font-semibold text-slate-700 mb-1">Click to upload photos</p>
                                            <p className="text-xs text-slate-400">JPG, PNG up to 5MB</p>
                                        </div>
                                    ) : (
                                        <div className="relative w-full h-64 bg-slate-100 rounded-2xl overflow-hidden group border border-slate-200">
                                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-slate-600 hover:text-red-500 hover:bg-white transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Charge Notice */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                                <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-amber-800">Note regarding Pickup Charges</h4>
                                    <p className="text-xs text-amber-700 mt-1">
                                        A fixed convenience fee of <span className="font-bold">₹40</span> will be deducted from your total earnings after the pickup is completed. This ensures our dealers can continue providing reliable doorstep service.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2 flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-14 text-base border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-[2] h-14 text-base bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 rounded-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Scheduling...
                                        </span>
                                    ) : (
                                        'Confirm Pickup Request'
                                    )}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <Truck size={18} />
                        </div>
                        <span className="text-xs font-medium text-slate-500">Fast Pickup</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <CheckCircle size={18} />
                        </div>
                        <span className="text-xs font-medium text-slate-500">Verified Dealers</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                            <Scale size={18} />
                        </div>
                        <span className="text-xs font-medium text-slate-500">Fair Weight</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SchedulePickup;
