import { Recycle, Users, BadgeCheck, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function OurImpact() {
    const { t } = useLanguage();

    const stats = [
        {
            value: "10,000+",
            label: t('home.impact.recycled.label'),
            subtext: t('home.impact.recycled.sub'),
            icon: Recycle,
            color: "emerald"
        },
        {
            value: "5,000+",
            label: t('home.impact.customers.label'),
            subtext: t('home.impact.customers.sub'),
            icon: Users,
            color: "sky"
        },
        {
            value: "500+",
            label: t('home.impact.dealers.label'),
            subtext: t('home.impact.dealers.sub'),
            icon: BadgeCheck,
            color: "amber"
        },
        {
            value: "15+",
            label: t('home.impact.cities.label'),
            subtext: t('home.impact.cities.sub'),
            icon: MapPin,
            color: "rose"
        },
    ]

    return (
        <section className="relative py-20 overflow-hidden bg-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-emerald-600">
                        {t('home.impact.subtitle')}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                        {t('home.impact.title')}
                    </h2>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="group relative p-6 rounded-3xl transition-all duration-300 bg-stone-50 border border-stone-200 hover:border-stone-300 hover:shadow-lg min-h-[16rem] flex flex-col"
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${stat.color === "emerald" ? "bg-emerald-500/10 text-emerald-500" :
                                stat.color === "sky" ? "bg-sky-500/10 text-sky-500" :
                                    stat.color === "amber" ? "bg-amber-500/10 text-amber-500" :
                                        "bg-rose-500/10 text-rose-500"
                                }`}>
                                <stat.icon className="w-6 h-6" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-center mb-4">
                                {/* Value */}
                                <p className="text-3xl md:text-4xl font-bold mb-2 text-stone-900">
                                    {stat.value}
                                </p>

                                {/* Label */}
                                <p className="font-medium mb-1 text-stone-700 text-base">
                                    {stat.label}
                                </p>

                                {/* Subtext */}
                                <p className="text-sm text-stone-400">
                                    {stat.subtext}
                                </p>
                            </div>

                            {/* Decorative number */}
                            <span className="absolute top-4 right-4 text-5xl md:text-6xl font-bold text-stone-200 pointer-events-none">
                                {index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}