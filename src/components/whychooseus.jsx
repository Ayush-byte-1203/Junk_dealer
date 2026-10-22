

import {
    Leaf,
    IndianRupee,
    Truck,
    ShieldCheck,
    Zap,
    BarChart3,
    ArrowRight
} from "lucide-react"
import { cn } from "../lib/utils"
import { useLanguage } from "../context/LanguageContext"
import { Link } from "react-router-dom"

const colorVariants = {
    emerald: {
        bg: "bg-emerald-500/10",
        icon: "text-emerald-600",
        statBg: "bg-emerald-500",
        border: "group-hover:border-emerald-500/50",
    },
    amber: {
        bg: "bg-amber-500/10",
        icon: "text-amber-600",
        statBg: "bg-amber-500",
        border: "group-hover:border-amber-500/50",
    },
    sky: {
        bg: "bg-sky-500/10",
        icon: "text-sky-600",
        statBg: "bg-sky-500",
        border: "group-hover:border-sky-500/50",
    },
    teal: {
        bg: "bg-teal-500/10",
        icon: "text-teal-600",
        statBg: "bg-teal-500",
        border: "group-hover:border-teal-500/50",
    },
    orange: {
        bg: "bg-orange-500/10",
        icon: "text-orange-600",
        statBg: "bg-orange-500",
        border: "group-hover:border-orange-500/50",
    },
    indigo: {
        bg: "bg-indigo-500/10",
        icon: "text-indigo-600",
        statBg: "bg-indigo-500",
        border: "group-hover:border-indigo-500/50",
    },
}

export function WhyChooseUs() {
    const { t } = useLanguage()

    const features = [
        {
            icon: Leaf,
            title: t('home.whyChooseUs.eco.title'),
            description: t('home.whyChooseUs.eco.desc'),
            stat: "10,000+",
            statLabel: t('home.whyChooseUs.eco.label'),
            color: "emerald",
        },
        {
            icon: IndianRupee,
            title: t('home.whyChooseUs.price.title'),
            description: t('home.whyChooseUs.price.desc'),
            stat: "20%",
            statLabel: t('home.whyChooseUs.price.label'),
            color: "amber",
        },
        {
            icon: Truck,
            title: t('home.whyChooseUs.pickup.title'),
            description: t('home.whyChooseUs.pickup.desc'),
            stat: "2 hrs",
            statLabel: t('home.whyChooseUs.pickup.label'),
            color: "sky",
        },
        {
            icon: ShieldCheck,
            title: t('home.whyChooseUs.verified.title'),
            description: t('home.whyChooseUs.verified.desc'),
            stat: "500+",
            statLabel: t('home.whyChooseUs.verified.label'),
            color: "teal",
        },
        {
            icon: Zap,
            title: t('home.whyChooseUs.payment.title'),
            description: t('home.whyChooseUs.payment.desc'),
            stat: "< 5 min",
            statLabel: t('home.whyChooseUs.payment.label'),
            color: "orange",
        },
        {
            icon: BarChart3,
            title: t('home.whyChooseUs.tracking.title'),
            description: t('home.whyChooseUs.tracking.desc'),
            stat: "24/7",
            statLabel: t('home.whyChooseUs.tracking.label'),
            color: "indigo",
        },
    ]

    return (
        <section className="py-24 bg-white max-w-7xl mx-auto">
            <div className="px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
                        {t('home.whyChooseUs.badge')}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
                        {t('home.whyChooseUs.title')}
                    </h2>
                    <p className="text-lg text-slate-600">
                        {t('home.whyChooseUs.subtitle')}
                    </p>
                </div>

                {/* Features Grid - Bento Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => {
                        const colors = colorVariants[feature.color]
                        const Icon = feature.icon

                        return (
                            <div
                                key={feature.title}
                                className={cn(
                                    "group relative bg-white rounded-2xl p-6 border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                                    colors.border,
                                    // Make first and last items span 2 columns on large screens
                                    index === 0 && "lg:col-span-2",
                                    index === 5 && "lg:col-span-2"
                                )}
                            >
                                {/* Stat Badge */}
                                <div className={cn(
                                    "absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold",
                                    colors.statBg
                                )}>
                                    {feature.stat} {feature.statLabel}
                                </div>

                                {/* Icon */}
                                <div className={cn(
                                    "w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110",
                                    colors.bg
                                )}>
                                    <Icon className={cn("w-7 h-7", colors.icon)} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover Arrow */}
                                <Link to="/about" className="mt-4 flex items-center text-sm font-medium text-slate-400 group-hover:text-teal-600 transition-colors">
                                    <span>Learn more</span>
                                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-slate-200">
                        <div className="flex -space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                                >
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                        </div>
                        <span className="text-slate-600">
                            <span className="font-semibold text-slate-900">5,000+</span> {t('home.whyChooseUs.happyCustomers')}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
