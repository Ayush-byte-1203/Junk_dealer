

import { useState, useEffect } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { useLanguage } from "../context/LanguageContext"

const testimonials = [
    {
        id: 1,
        name: "Rajesh Kumar",
        location: "Mumbai, Maharashtra",
        rating: 5,
        text: "Junk Dealer made selling my old electronics so easy! The pickup was on time, and I got a fair price. Highly recommend their service!",
        initials: "RK",
        color: "bg-amber-500",
        tag: "Electronics",
    },
    {
        id: 2,
        name: "Priya Sharma",
        location: "Delhi NCR",
        rating: 5,
        text: "Best platform for scrap dealing! The rates are transparent and competitive. I've been using this service for 6 months now.",
        initials: "PS",
        color: "bg-emerald-500",
        tag: "Regular Seller",
    },
    {
        id: 3,
        name: "Amit Patel",
        location: "Bangalore, Karnataka",
        rating: 5,
        text: "Excellent service! They picked up 50kg of paper and metal from my office. Professional team and instant payment. Will use again!",
        initials: "AP",
        color: "bg-rose-500",
        tag: "Business",
    },
    {
        id: 4,
        name: "Sneha Reddy",
        location: "Hyderabad, Telangana",
        rating: 5,
        text: "Great initiative for the environment! I sold my old newspapers and plastic bottles. The process was smooth and hassle-free.",
        initials: "SR",
        color: "bg-sky-500",
        tag: "Eco Warrior",
    },
    {
        id: 5,
        name: "Vikram Singh",
        location: "Jaipur, Rajasthan",
        rating: 5,
        text: "As a dealer, this platform has helped me connect with more customers. The admin panel is user-friendly and efficient!",
        initials: "VS",
        color: "bg-violet-500",
        tag: "Verified Dealer",
    },
    {
        id: 6,
        name: "Kavita Desai",
        location: "Pune, Maharashtra",
        rating: 4,
        text: "Fantastic experience! Got the best rates for my aluminium scrap. The team was punctual and very professional. 5 stars!",
        initials: "KD",
        color: "bg-orange-500",
        tag: "Metals",
    },
]

export function Testimonials() {
    const { t } = useLanguage()
    const [activeIndex, setActiveIndex] = useState(0)

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
    }

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3))
    }

    return (
        <section className="py-20 bg-white max-w-7xl mx-auto">
            <div className="px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                        {t('home.testimonials.badge')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        {t('home.testimonials.title')}
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        {t('home.testimonials.subtitle')}
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="relative">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300"
                            >
                                {/* Quote Icon */}
                                <div className="absolute -top-3 -left-3 w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                                    <Quote className="w-5 h-5 text-white" />
                                </div>

                                {/* Tag */}
                                <div className="flex justify-end mb-4">
                                    <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                                        {testimonial.tag}
                                    </span>
                                </div>

                                {/* Review Text */}
                                <p className="text-slate-700 leading-relaxed mb-6 min-h-[80px]">
                                    "{testimonial.text}"
                                </p>

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < testimonial.rating
                                                ? "fill-amber-400 text-amber-400"
                                                : "fill-slate-200 text-slate-200"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Customer Info */}
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                    <Avatar className={`${testimonial.color} text-white`}>
                                        <AvatarFallback className={`${testimonial.color} text-white font-semibold`}>
                                            {testimonial.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                                        <p className="text-sm text-slate-500">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation - for mobile carousel */}
                    <div className="flex justify-center gap-3 mt-8 lg:hidden">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            className="rounded-full bg-transparent"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextSlide}
                            className="rounded-full bg-transparent"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-emerald-600">
                            <CountUp end={4.9} decimals={1} duration={2000} />
                        </p>
                        <p className="text-slate-600 text-sm">{t('home.testimonials.stats.rating')}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-emerald-600">
                            <CountUp end={5000} duration={2000} separator="," suffix="+" />
                        </p>
                        <p className="text-slate-600 text-sm">{t('home.testimonials.stats.customers')}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-emerald-600">
                            <CountUp end={98} duration={2000} suffix="%" />
                        </p>
                        <p className="text-slate-600 text-sm">{t('home.testimonials.stats.satisfaction')}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function CountUp({ end, duration = 2000, decimals = 0, separator = "", suffix = "" }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let startTime
        let animationFrame

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime
            const percentage = Math.min(progress / duration, 1)

            // Easing function: easeOutExpo
            const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage)

            setCount(ease * end)

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame)
        }
    }, [end, duration])

    const formattedCount = count.toFixed(decimals)
    const [integerPart, decimalPart] = formattedCount.split(".")
    const formattedInteger = Number(integerPart).toLocaleString()
    // Handle separator manually if needed, or rely on toLocaleString for standard comma separator
    // Since toLocaleString handles commas significantly better, we reuse it.
    // However, for strict control based on user request (e.g. 5,000), let's ensure we match.

    // Combining:
    const displayValue = separator
        ? Number(integerPart).toLocaleString().replace(/,/g, separator) // Replace if custom separator (though toLocaleString defaults to comma in US/standard locales)
        : Number(integerPart).toLocaleString()

    return (
        <span>
            {displayValue}{decimalPart ? `.${decimalPart}` : ""}{suffix}
        </span>
    )
}
