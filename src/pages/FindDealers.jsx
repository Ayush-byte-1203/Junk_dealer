import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MapPin, Recycle, CheckCircle, Star, Clock, Loader2, Navigation } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
};

const FindDealers = () => {
    const navigate = useNavigate();
    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [locationStatus, setLocationStatus] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [mapCenter, setMapCenter] = useState([22.3072, 73.1812]); // Default to Vadodara

    const fetchDealers = useCallback(async (lat = null, lng = null) => {
        setLoading(true);
        try {
            let url = 'http://localhost:8000/api/admin/dealers/';
            if (lat && lng) {
                url += `?lat=${lat}&lng=${lng}`;
            }
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch dealers');
            const data = await response.json();
            setDealers(data);
        } catch (error) {
            console.error("Error fetching dealers:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDealers();
    }, [fetchDealers]);

    const handleUseMyLocation = () => {
        setLocationStatus('detecting');
        if (!navigator.geolocation) {
            setLocationStatus('error');
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newLocation = { lat: latitude, lng: longitude };
                setUserLocation(newLocation);
                setMapCenter([latitude, longitude]);
                setLocationStatus('success');
                fetchDealers(latitude, longitude);
            },
            () => {
                setLocationStatus('error');
                alert("Unable to retrieve your location");
                // Fallback to Parul University area if detection fails as per user context
                setMapCenter([22.2880, 73.3630]);
            }
        );
    };

    // Helper to calculate distance
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        if (!lat1 || !lon1 || !lat2 || !lon2) return null;
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d.toFixed(1);
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // Filter and Sort Dealers
    const displayedDealers = dealers.filter(dealer => {
        const searchLower = searchQuery.toLowerCase();
        // Basic search by name or location
        return dealer.name.toLowerCase().includes(searchLower) ||
            (dealer.location && dealer.location.toLowerCase().includes(searchLower));
    }).map(dealer => {
        // Add distance if user location exists
        if (userLocation && dealer.lat && dealer.lng) {
            return { ...dealer, distance: parseFloat(calculateDistance(userLocation.lat, userLocation.lng, dealer.lat, dealer.lng)) };
        }
        return { ...dealer, distance: null };
    }).sort((a, b) => {
        // Sort by distance if available
        if (userLocation && a.distance !== null && b.distance !== null) {
            return a.distance - b.distance;
        }
        return 0; // Maintain original order
    });


    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-20">
                {/* Header Section */}
                <div className="bg-slate-900 text-white py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Find Verified Scrap Dealers
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
                            Locate trusted dealers near you for the best prices and eco-friendly recycling.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                    {/* Search & Filter Bar */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 mb-8">
                        <div className="grid md:grid-cols-7 gap-4 items-end">
                            <div className="md:col-span-3 space-y-2">
                                <label className="text-sm font-medium text-slate-700">Location</label>
                                <div className="relative flex gap-2">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                                        <MapPin className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <Input
                                        type="text"
                                        placeholder="Enter area..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors flex-grow"
                                    />
                                    <Button
                                        variant="outline"
                                        className="h-11 px-4 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                        onClick={handleUseMyLocation}
                                        disabled={locationStatus === 'detecting'}
                                    >
                                        {locationStatus === 'detecting' ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Navigation className="w-5 h-5" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <div className="md:col-span-3 space-y-2">
                                <label className="text-sm font-medium text-slate-700">Scrap Material</label>
                                <div className="relative">
                                    <Recycle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="e.g. Iron, Plastic, E-waste"
                                        className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-1">
                                <Button className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Dealers List */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    {loading ? 'Loading dealers...' : `Showing ${displayedDealers.length} dealers near you`}
                                </h2>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-emerald-500" />
                                    <p>Finding nearby dealers...</p>
                                </div>
                            ) : displayedDealers.length > 0 ? (
                                displayedDealers.map((dealer) => (
                                    <div key={dealer.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="md:flex">
                                            <div className="md:w-auto p-4 md:p-6 flex justify-center md:justify-start items-start bg-slate-50 md:bg-transparent">
                                                <div className="relative w-24 h-24 shrink-0">
                                                    <img
                                                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${dealer.name}`}
                                                        alt={dealer.name}
                                                        className="w-full h-full object-cover rounded-xl bg-emerald-50 border border-emerald-100 shadow-sm"
                                                    />
                                                    <div className="absolute -bottom-2 -right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-slate-100 ring-1 ring-slate-50">
                                                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                                                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Verified</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 grow">
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-slate-900 mb-1">{dealer.name}</h3>
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <div className="flex text-amber-400">
                                                                <Star className="w-4 h-4 fill-current" />
                                                                <span className="ml-1 font-bold text-slate-700">4.8</span>
                                                            </div>
                                                            <span>(100+ reviews)</span>
                                                        </div>
                                                    </div>
                                                    {dealer.distance && (
                                                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 gap-1 w-fit">
                                                            <MapPin className="w-3 h-3" />
                                                            {dealer.distance} km away
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {['Paper', 'Plastic', 'Metals', 'E-waste'].slice(0, 3).map(tag => (
                                                        <Badge key={tag} variant="outline" className="border-slate-200 text-slate-600 bg-slate-50">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-6">
                                                    <div className="flex items-start gap-2 text-sm text-slate-600">
                                                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                                        <span>{dealer.location || "Location not found"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                                                        <span className="text-emerald-600 font-medium">Open • Closes 8 PM</span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <Button
                                                        onClick={() => navigate('/schedule-pickup')}
                                                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-colors"
                                                    >
                                                        Book Pickup
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="flex-1 border-slate-200 hover:bg-slate-50 text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        View Profile
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                    <p className="text-slate-500">No dealers found matching your search.</p>
                                </div>
                            )}
                        </div>

                        {/* Map Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sticky top-24">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-slate-900">Dealer Locations</h4>
                                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-8">
                                        Expand Map
                                    </Button>
                                </div>
                                {/* Interactive Map */}
                                <div className="bg-slate-100 rounded-lg h-[400px] w-full relative overflow-hidden z-0">
                                    <MapContainer
                                        center={mapCenter}
                                        zoom={12}
                                        className="h-full w-full"
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <RecenterMap center={mapCenter} />

                                        {/* User Location Marker */}
                                        {userLocation && (
                                            <Marker position={[userLocation.lat, userLocation.lng]}>
                                                <Popup>You are here</Popup>
                                            </Marker>
                                        )}

                                        {/* Dealer Markers */}
                                        {dealers.map((dealer) => (
                                            dealer.lat && dealer.lng && (
                                                <Marker
                                                    key={dealer.id}
                                                    position={[parseFloat(dealer.lat), parseFloat(dealer.lng)]}
                                                >
                                                    <Popup>
                                                        <div className="font-semibold">{dealer.name}</div>
                                                        <div className="text-xs text-gray-600">{dealer.location}</div>
                                                    </Popup>
                                                </Marker>
                                            )
                                        ))}
                                    </MapContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FindDealers;
