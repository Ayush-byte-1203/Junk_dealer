import { useNavigate } from "react-router-dom"
import { Calendar, Scale, Banknote, BarChart3, ArrowRight } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import { Button } from "./ui/button"


export function HowItWorks({ variant = "default" }) {
    const { t } = useLanguage()
    const navigate = useNavigate()
    const isDark = variant === "dark"

    const steps = [
        {
            number: "01",
            title: t('home.howItWorks.step1.title'),
            description: t('home.howItWorks.step1.desc'),
            icon: Calendar,
            highlight: t('home.howItWorks.step1.highlight'),
        },
        {
            number: "02",
            title: t('home.howItWorks.step2.title'),
            description: t('home.howItWorks.step2.desc'),
            icon: Scale,
            highlight: t('home.howItWorks.step2.highlight'),
        },
        {
            number: "03",
            title: t('home.howItWorks.step3.title'),
            description: t('home.howItWorks.step3.desc'),
            icon: Banknote,
            highlight: t('home.howItWorks.step3.highlight'),
        },
        {
            number: "04",
            title: t('home.howItWorks.step4.title'),
            description: t('home.howItWorks.step4.desc'),
            icon: BarChart3,
            highlight: t('home.howItWorks.step4.highlight'),
        },
    ]

    return (
        <section className={`py-24 ${isDark ? "bg-emerald-950" : "bg-white"} max-w-7xl mx-auto`}>
            <div className="px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <p className={`text-sm font-semibold tracking-widest uppercase mb-3 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                        {t('home.howItWorks.subtitle')}
                    </p>
                    <h2 className={`text-3xl md:text-5xl font-bold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {t('home.howItWorks.title')}
                    </h2>
                    <p className={`text-lg ${isDark ? "text-emerald-100/60" : "text-gray-600"}`}>
                        {t('home.howItWorks.desc')}
                    </p>
                </div>

                {/* Steps - Timeline Layout */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className="group relative flex gap-5"
                            >
                                {/* Step Card */}
                                <div className={`flex-1 p-6 md:p-8 rounded-3xl transition-all duration-300 hover:shadow-xl ${isDark
                                    ? "bg-emerald-900/40 border border-emerald-800/50 hover:bg-emerald-900/60"
                                    : "bg-white border border-gray-200 hover:border-emerald-200"
                                    }`}>
                                    {/* Number & Icon Row */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className={`text-5xl font-bold ${isDark ? "text-emerald-800" : "text-gray-200"}`}>
                                            {step.number}
                                        </span>
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isDark
                                            ? "bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30"
                                            : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
                                            }`}>
                                            <step.icon className="w-7 h-7" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                                        {step.title}
                                    </h3>
                                    <p className={`mb-4 leading-relaxed ${isDark ? "text-emerald-100/60" : "text-gray-500"}`}>
                                        {step.description}
                                    </p>

                                    {/* Highlight Tag */}
                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${isDark
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "bg-emerald-50 text-emerald-700"
                                        }`}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                        {step.highlight}
                                    </div>
                                </div>

                                {/* Connector Arrow (hidden on last item) */}
                                {index < steps.length - 1 && (
                                    <div className={`hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center ${index % 2 === 0 ? "rotate-45" : "-rotate-45"
                                        } ${isDark ? "text-emerald-700" : "text-gray-300"}`}>
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-5">
                    <Button onClick={() => navigate('/pickups')} className="inline-flex items-center gap-2 mt-5 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-colors shadow-lg shadow-emerald-600/25 h-auto text-base">
                        {t('home.howItWorks.cta')}
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
