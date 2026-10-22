import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';
import { translateScrapType, translateStatus } from '../utils/dataTranslation';

// Fix for default Leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Pickups = () => {
    const [myPickups, setMyPickups] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { language } = useLanguage();

    React.useEffect(() => {
        fetchPickups();
    }, []);

    const fetchPickups = async () => {
        try {
            // Fetch from API instead of localStorage
            const response = await fetch('http://localhost:8000/api/user/pickups/');
            const data = await response.json();

            // Transform API data to match the component's expected format
            const formattedPickups = data.map(pickup => {
                // Parse weight as number, default to 0 if invalid
                const weight = parseFloat(pickup.total_weight) || 0;

                // Calculate estimated value (₹12 per kg for paper, adjust based on type)
                const ratePerKg = 12; // Default rate
                const estValue = weight > 0 ? Math.round(weight * ratePerKg) : 0;

                return {
                    id: `#PKP-${pickup.id}`,
                    status: pickup.status || 'Scheduled',
                    date: new Date(pickup.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    time: pickup.notes?.includes('Time:') ? pickup.notes.split('Time: ')[1] : '10:30 AM',
                    scrapType: pickup.items,
                    label: translateScrapType(pickup.items, language),
                    weight: weight.toString(),
                    address: pickup.address,
                    estValue: weight > 0 ? `₹ ${estValue}` : 'TBD',
                    timestamp: new Date(pickup.created_at || pickup.scheduled_date).getTime()
                };
            });

            // Sort by timestamp (newest first)
            formattedPickups.sort((a, b) => b.timestamp - a.timestamp);

            setMyPickups(formattedPickups);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pickups:', error);
            setLoading(false);
            // Fallback to empty array on error
            setMyPickups([]);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mb-20 min-h-screen">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">My Pickups</h1>
                    <p className="text-slate-500 mt-1">Track your pickup requests & Find Dealers</p>
                </div>
                <button
                    onClick={() => window.location.href = '/schedule-pickup'}
                    className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:bg-emerald-700 transition-colors"
                >
                    + New Pickup
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: List */}
                <div className="lg:col-span-2 space-y-4">
                    {myPickups.map((pickup, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
                            <div className={`p-6 border-b border-slate-100 flex justify-between items-start ${pickup.status === 'Completed' ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white' : 'bg-slate-50/50'}`}>
                                <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm border ${pickup.status === 'Completed' ? 'bg-white/10 border-white/10 backdrop-blur-sm' : 'bg-white border-slate-100'}`}>
                                        {pickup.status === 'Completed' ? '✅' : '🚛'}
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-lg ${pickup.status === 'Completed' ? 'text-white' : 'text-slate-800'}`}>{pickup.id}</h3>
                                        <div className={`flex items-center gap-2 text-sm mt-1 ${pickup.status === 'Completed' ? 'text-slate-300' : 'text-slate-500'}`}>
                                            <span>📅</span>
                                            <span>{pickup.date} • {pickup.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${pickup.status === 'Completed'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                    : 'bg-amber-100 text-amber-700 border-transparent'
                                    }`}>
                                    {translateStatus(pickup.status, language)}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl text-slate-400">📦</span>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Scrap Type</p>
                                            <p className="font-medium text-slate-900 mt-0.5">{pickup.label || pickup.scrapType}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl text-slate-400">⚖️</span>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Est. Weight</p>
                                            <p className="font-medium text-slate-900 mt-0.5">{pickup.weight} kg</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <span className="text-xl mt-0.5">📍</span>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pickup Address</p>
                                        <p className="text-sm text-slate-700 mt-0.5 leading-relaxed">{pickup.address}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-600">Est. Value</span>
                                <span className={`text-lg font-bold ${(pickup.estValue?.includes('TBD') || pickup.label === 'Other' || pickup.scrapType === 'other') ? 'text-amber-600' : 'text-emerald-600'}`}>
                                    {(pickup.label === 'Other' || pickup.scrapType === 'Other' || pickup.scrapType === 'other')
                                        ? <span className="text-sm font-medium text-amber-600">Calculated at pickup</span>
                                        : (pickup.estValue || 'Pending')
                                    }
                                </span>
                            </div>
                            {pickup.estValue?.includes('TBD') && (
                                <div className="px-6 pb-4 bg-slate-50">
                                    <p className="text-[10px] text-slate-400 italic">
                                        * Final price decided at pickup based on material quality & weight.
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}

                    {loading ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                            <p className="text-slate-500">Loading pickups...</p>
                        </div>
                    ) : myPickups.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500">No pickups scheduled yet.</p>
                        </div>
                    ) : null}
                </div>

                {/* Right Column: Map */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-1">
                        <div className="relative h-[400px] lg:h-[600px] w-full bg-slate-100 rounded-xl overflow-hidden shadow-inner z-0">
                            <MapContainer center={[19.0760, 72.8777]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {myPickups.map((pickup, idx) => (
                                    <Marker key={idx} position={[19.0760 + (idx * 0.01), 72.8777 + (idx * 0.01)]}>
                                        <Popup>
                                            <div className="text-sm font-medium">
                                                {pickup.id}<br />
                                                <span className="text-xs text-slate-500">{pickup.status}</span>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>

                            <button
                                onClick={() => {
                                    setLoading(true);
                                    fetchPickups();
                                }}
                                className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur-sm hover:bg-white text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm border border-slate-200/50 transition-all flex items-center gap-2"
                            >
                                <span>🔄</span> Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pickups;
