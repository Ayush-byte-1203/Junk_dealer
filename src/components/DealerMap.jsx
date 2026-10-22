

import { useState, useEffect } from "react"
import { MapPin, Navigation, Search, Phone, Star, Clock, ChevronRight } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { useLanguage } from "../context/LanguageContext"

// Fix for default Leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

const dealers = [
    {
        id: 1,
        name: "Green Recyclers Hub",
        distance: "1.2 km",
        rating: 4.8,
        reviews: 124,
        specialties: ["Electronics", "Metals"],
        status: "Open Now",
        phone: "+91 98765 43210",
        lat: 19.0760,
        lng: 72.8777,
    },
    {
        id: 2,
        name: "EcoScrap Solutions",
        distance: "2.5 km",
        rating: 4.6,
        reviews: 89,
        specialties: ["Paper", "Plastic"],
        status: "Open Now",
        phone: "+91 98765 43211",
        lat: 19.0860,
        lng: 72.8877,
    },
    {
        id: 3,
        name: "Metro Scrap Dealers",
        distance: "3.8 km",
        rating: 4.9,
        reviews: 256,
        specialties: ["All Materials"],
        status: "Closes at 8 PM",
        phone: "+91 98765 43212",
        lat: 19.0660,
        lng: 72.8677,
    },
]

function MapUpdater({ selectedDealer, center }) {
    const map = useMap()

    // Fly to selected dealer
    useEffect(() => {
        if (selectedDealer) {
            const dealer = dealers.find(d => d.id === selectedDealer)
            if (dealer) {
                map.flyTo([dealer.lat, dealer.lng], 15)
            }
        }
    }, [selectedDealer, map])

    // Fly to user location
    useEffect(() => {
        if (center) {
            map.flyTo(center, 15)
        }
    }, [center, map])

    return null
}

export function DealerMap() {
    const { t } = useLanguage()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDealer, setSelectedDealer] = useState(null)
    const [userLocation, setUserLocation] = useState(null)
    const [isLocating, setIsLocating] = useState(false)

    const handleUseLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser")
            return
        }

        setIsLocating(true)

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setUserLocation([latitude, longitude])
                setIsLocating(false)
            },
            (error) => {
                console.error("Error getting location:", error)
                setIsLocating(false)
                alert("Unable to retrieve your location")
            }
        )
    }

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
                        {t('home.map.badge')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        {t('home.map.title')}
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        {t('home.map.subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Dealer List */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder={t('home.map.searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-12 rounded-xl border-slate-200"
                            />
                        </div>

                        {/* Location Button */}
                        <Button
                            variant="outline"
                            onClick={handleUseLocation}
                            disabled={isLocating}
                            className="w-full h-12 rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50 gap-2 bg-transparent"
                        >
                            {isLocating ? (
                                <span className="animate-spin">⌛</span>
                            ) : (
                                <Navigation className="w-4 h-4" />
                            )}
                            {isLocating ? "Locating..." : t('home.map.useLocation')}
                        </Button>

                        {/* Dealer Cards */}
                        <div className="space-y-3 mt-6">
                            <p className="text-sm font-medium text-slate-500">{t('home.map.nearby')}</p>
                            {dealers.map((dealer) => (
                                <div
                                    key={dealer.id}
                                    onClick={() => setSelectedDealer(dealer.id)}
                                    onKeyDown={(e) => e.key === "Enter" && setSelectedDealer(dealer.id)}
                                    tabIndex={0}
                                    role="button"
                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedDealer === dealer.id
                                        ? "border-emerald-500 bg-emerald-50 shadow-md"
                                        : "border-slate-200 hover:border-emerald-300 hover:shadow-sm"
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold text-slate-900">{dealer.name}</h4>
                                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span>{dealer.distance}</span>
                                                <span className="text-slate-300">|</span>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                    <span>{dealer.rating}</span>
                                                    <span className="text-slate-400">({dealer.reviews})</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 transition-transform ${selectedDealer === dealer.id ? "text-emerald-600 rotate-90" : "text-slate-400"
                                            }`} />
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {dealer.specialties.map((spec) => (
                                            <Badge key={spec} variant="secondary" className="bg-slate-100 text-slate-600 font-normal">
                                                {spec}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                            <span className="text-emerald-600 font-medium">{dealer.status}</span>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-1.5">
                                            <Phone className="w-3.5 h-3.5" />
                                            {t('home.map.call')}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-slate-200 min-h-[500px] z-0">
                        <MapContainer center={[19.0760, 72.8777]} zoom={13} style={{ height: "100%", width: "100%", minHeight: "500px" }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MapUpdater selectedDealer={selectedDealer} center={userLocation} />

                            {userLocation && (
                                <Marker position={userLocation}>
                                    <Popup>You are here</Popup>
                                </Marker>
                            )}

                            {dealers.map((dealer) => (
                                <Marker
                                    key={dealer.id}
                                    position={[dealer.lat, dealer.lng]}
                                    eventHandlers={{
                                        click: () => {
                                            setSelectedDealer(dealer.id)
                                        },
                                    }}
                                >
                                    <Popup>
                                        <div className="p-2">
                                            <h3 className="font-bold text-sm">{dealer.name}</h3>
                                            <p className="text-xs text-gray-500">{dealer.address}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                <span className="text-xs font-bold">{dealer.rating}</span>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        {/* Map Controls Overlay */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
                            <Button
                                size="sm"
                                onClick={handleUseLocation}
                                disabled={isLocating}
                                className="bg-emerald-600 hover:bg-emerald-700 shadow-lg gap-2"
                            >
                                {isLocating ? (
                                    <span className="animate-spin text-white">⌛</span>
                                ) : (
                                    <Navigation className="w-4 h-4" />
                                )}
                                {t('home.map.useLocation')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
