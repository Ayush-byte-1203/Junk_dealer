import { Link, useNavigate } from "react-router-dom"
import { Recycle, Facebook, Twitter, Instagram, Youtube, ArrowRight, Smartphone } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useLanguage } from "../context/LanguageContext"



export function Footer() {
    const { t } = useLanguage()
    const navigate = useNavigate()

    const quickLinks = [
        { name: t('footer.links.howItWorks'), href: "/about#how-it-works" },
        { name: t('nav.about'), href: "/about" },
        { name: t('nav.rates'), href: "/rates" },
        { name: t('footer.links.dealers'), href: "/signup" }, // Fixed: Dealer Registration -> Signup
        { name: t('nav.marketplace'), href: "/marketplace" },
    ]

    const services = [
        { name: t('userPanel.schedulePickup'), href: "/pickups" },
        { name: t('footer.links.calculator'), href: "/calculator" },
        { name: t('footer.links.business'), href: "/about" },
        { name: t('footer.links.centers'), href: "/find-dealers" }, // Recycling Centers -> Find Dealers
        { name: t('footer.links.partner'), href: "/signup" },
    ]

    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
            {/* CTA Banner */}
            <div className="border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 md:p-8">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{t('footer.banner.title')}</h3>
                            <p className="text-emerald-100">{t('footer.banner.desc')}</p>
                        </div>
                        <Button onClick={() => navigate('/pickups')} size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 shrink-0">
                            {t('footer.banner.cta')}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                                <Recycle className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <span className="font-bold text-xl block text-white">Junk Dealer</span>
                                <span className="text-emerald-400 text-sm">MARKETPLACE</span>
                            </div>
                        </Link>
                        <p className="text-white mb-6 max-w-sm leading-relaxed">
                            {t('footer.brandDesc')}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: "#", label: "Facebook" },
                                { icon: Twitter, href: "#", label: "Twitter" },
                                { icon: Instagram, href: "#", label: "Instagram" },
                                { icon: Youtube, href: "#", label: "Youtube" },
                            ].map((social) => (
                                <Link
                                    key={social.label}
                                    to={social.href}
                                    className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-white">{t('footer.headers.quickLinks')}</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-white hover:text-emerald-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-white">{t('footer.headers.services')}</h4>
                        <ul className="space-y-3">
                            {services.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-white hover:text-emerald-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & App */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-white">{t('footer.headers.stayUpdated')}</h4>
                        <p className="text-white text-sm mb-4">{t('footer.newsletter.tips')}</p>
                        <div className="flex gap-2 mb-6">
                            <Input
                                type="email"
                                placeholder={t('footer.newsletter.placeholder')}
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-11"
                            />
                            <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700 h-11 w-11 shrink-0">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <p className="text-sm text-white mb-3">{t('footer.newsletter.app')}</p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800 hover:text-white gap-2 bg-transparent">
                                <Smartphone className="w-4 h-4" />
                                App Store
                            </Button>
                            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800 hover:text-white gap-2 bg-transparent">
                                <Smartphone className="w-4 h-4" />
                                Play Store
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Cities */}

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white text-sm">
                            {t('footer.copyright')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
                            <Link to="/privacy" className="hover:text-emerald-400 transition-colors">{t('footer.legal.privacy')}</Link>
                            <Link to="/terms" className="hover:text-emerald-400 transition-colors">{t('footer.legal.terms')}</Link>
                            <Link to="/refund" className="hover:text-emerald-400 transition-colors">{t('footer.legal.refund')}</Link>
                            <Link to="/contact" className="hover:text-emerald-400 transition-colors">{t('footer.legal.contact')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
