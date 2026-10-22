import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Leaf, Banknote, Clock, ShieldCheck, ChevronRight, MapPin } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useLanguage } from "../context/LanguageContext"
import { useNavigate } from "react-router-dom"

export default function Hero() {
    const { isAuthenticated, openLoginModal } = useAuth(); // hook
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleAction = () => {
        if (isAuthenticated) {
            // If logged in, go to dashboard/schedule logic (for now just schedule page placeholder or dashboard)
            navigate('/user-dashboard');
        } else {
            openLoginModal();
        }
    };

    return (
        <section className="relative min-h-screen bg-white overflow-hidden -mt-20">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-100/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-28">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Badge */}
                    <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 px-4 py-2">
                        <Leaf className="w-4 h-4 mr-2" />
                        Sustainable. Simple. Rewarding.
                    </Badge>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-tight tracking-tight text-balance">
                        {t('home.heroTitle')}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
                        {t('home.heroSubtitle')}
                    </p>

                    {/* CTA Section */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button onClick={handleAction} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-600/25">
                            <MapPin className="mr-2 w-5 h-5" />
                            {t('home.getStarted')}
                        </Button>
                        <Button onClick={() => navigate('/rates')} size="lg" variant="ghost" className="text-stone-700 font-semibold px-8 py-6 text-lg hover:bg-stone-100 rounded-full">
                            {t('home.ratesDesc')}
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center gap-8 pt-12">
                        <div className="flex items-center gap-3 text-stone-600">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                <Banknote className="w-5 h-5 text-amber-600" />
                            </div>
                            <span className="font-medium">Instant Payment</span>
                        </div>
                        <div className="flex items-center gap-3 text-stone-600">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Clock className="w-5 h-5 text-emerald-600" />
                            </div>
                            <span className="font-medium">Same Day Pickup</span>
                        </div>
                        <div className="flex items-center gap-3 text-stone-600">
                            <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-sky-600" />
                            </div>
                            <span className="font-medium">Verified Weights</span>
                        </div>
                    </div>
                </div>

                {/* Price Cards Row */}
                <div className="mt-20 max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "Newspaper", price: "₹16", unit: "/kg", color: "bg-amber-50 border-amber-200", iconColor: "text-amber-600" },
                            { name: "Iron/Steel", price: "₹28", unit: "/kg", color: "bg-slate-50 border-slate-200", iconColor: "text-slate-600" },
                            { name: "Copper", price: "₹450", unit: "/kg", color: "bg-orange-50 border-orange-200", iconColor: "text-orange-600" },
                            { name: "Plastic", price: "₹12", unit: "/kg", color: "bg-sky-50 border-sky-200", iconColor: "text-sky-600" },
                        ].map((item) => (
                            <div key={item.name} className={`${item.color} border rounded-2xl p-6 text-center hover:scale-105 transition-transform cursor-pointer`}>
                                <p className="text-stone-500 text-sm font-medium mb-2">{item.name}</p>
                                <p className="text-3xl font-bold text-stone-900">{item.price}<span className="text-lg text-stone-400">{item.unit}</span></p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-stone-400 text-sm mt-4">*Prices updated daily based on market rates</p>
                </div>
            </div>
        </section>
    )
}
