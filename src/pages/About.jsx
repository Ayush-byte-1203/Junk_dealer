import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Target, Star, Heart, Handshake, Leaf, Zap, ShieldCheck, Users, TrendingUp, Recycle, Banknote, Truck, Smartphone, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mentors, teammates } from '../data/teamData';



const About = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-emerald-500/50 text-emerald-400 px-4 py-1.5 backdrop-blur-sm">
                        Since 2024
                    </Badge>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
                        {t('about.title')}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        {t('about.subtitle')}
                    </p>
                </div>
            </section>

            {/* Mission/Vision/Impact Grid */}
            <section className="py-20 -mt-10 relative z-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Target, title: 'about.mission.title', desc: 'about.mission.desc', color: 'emerald' },
                        { icon: Star, title: 'about.vision.title', desc: 'about.vision.desc', color: 'amber' },
                        { icon: Heart, title: 'about.impact.title', desc: 'about.impact.desc', color: 'rose' }
                    ].map((item, idx) => (
                        <Card key={idx} className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-8 text-center bg-white h-full flex flex-col items-center">
                                <div className={`w-16 h-16 rounded-2xl bg-${item.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className={`w-8 h-8 text-${item.color}-500`} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t(item.title)}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {t(item.desc)}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                        <span className="text-2xl">📖</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        {t('about.story.title')}
                    </h2>
                    <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                        <p>{t('about.story.p1')}</p>
                        <p>{t('about.story.p2')}</p>
                        <p>{t('about.story.p3')}</p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-emerald-50 text-slate-900 px-4 relative overflow-hidden mx-4 md:mx-8 rounded-3xl my-8">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-emerald-900">
                        {t('about.values.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Handshake, key: 'transparency' },
                            { icon: Leaf, key: 'sustainability' },
                            { icon: Zap, key: 'innovation' },
                            { icon: ShieldCheck, key: 'reliability' },
                            { icon: Users, key: 'community' },
                            { icon: TrendingUp, key: 'growth' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 hover:bg-white transition-colors shadow-sm hover:shadow-md">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 rounded-lg">
                                        <item.icon className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{t(`about.values.${item.key}.title`)}</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    {t(`about.values.${item.key}.desc`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-b border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                        {[
                            { val: "10,000+", label: 'about.stats.tons' },
                            { val: "5,000+", label: 'about.stats.customers' },
                            { val: "500+", label: 'about.stats.dealers' },
                            { val: "15+", label: 'about.stats.cities' }
                        ].map((stat, idx) => (
                            <div key={idx} className="p-4">
                                <h2 className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">{stat.val}</h2>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{t(stat.label)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet Our Team */}
            <section className="py-24 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
                        {t('about.team.title')}
                    </h2>

                    {/* Mentors Section - 2 Columns */}
                    <div className="grid md:grid-cols-2 gap-8 justify-center mb-12">
                        {mentors.map((member, idx) => (
                            <div key={idx} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 text-center">
                                <div className="w-32 h-32 mx-auto mb-6 relative group-hover:scale-105 transition-transform">
                                    <div className={`absolute inset-0 rounded-full bg-emerald-100 opacity-20 blur-xl group-hover:opacity-40 transition-opacity`} />
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-md relative z-10"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                <div className="text-sm font-semibold text-emerald-600 mb-2">{member.role}</div>
                                {member.email && (
                                    <p className="text-slate-500 text-sm leading-relaxed truncate px-4">
                                        {member.email}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Lead Team Member - Centered */}
                    {teammates.length > 0 && (
                        <div className="flex justify-center mb-12">
                            <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 text-center w-full max-w-md">
                                <div className="w-32 h-32 mx-auto mb-6 relative group-hover:scale-105 transition-transform">
                                    <div className={`absolute inset-0 rounded-full bg-slate-100 opacity-20 blur-xl group-hover:opacity-40 transition-opacity`} />
                                    <img
                                        src={teammates[0].image}
                                        alt={teammates[0].name}
                                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-md relative z-10"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{teammates[0].name}</h3>
                                <div className="text-sm font-semibold text-emerald-600 mb-2">{teammates[0].role}</div>
                                {teammates[0].email && (
                                    <p className="text-slate-500 text-sm leading-relaxed truncate px-4">
                                        {teammates[0].email}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Remaining Team Members - 3 Columns */}
                    <div className="grid md:grid-cols-3 gap-8 justify-center">
                        {teammates.slice(1).map((member, idx) => (
                            <div key={idx} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 text-center">
                                <div className="w-32 h-32 mx-auto mb-6 relative group-hover:scale-105 transition-transform">
                                    <div className={`absolute inset-0 rounded-full bg-slate-100 opacity-20 blur-xl group-hover:opacity-40 transition-opacity`} />
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-md relative z-10"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                <div className="text-sm font-semibold text-emerald-600 mb-2">{member.role}</div>
                                {member.email && (
                                    <p className="text-slate-500 text-sm leading-relaxed truncate px-4">
                                        {member.email}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { icon: Recycle, key: 'eco', color: 'text-green-500' },
                            { icon: Banknote, key: 'price', color: 'text-amber-500' },
                            { icon: Truck, key: 'pickup', color: 'text-blue-500' },
                            { icon: Smartphone, key: 'digital', color: 'text-purple-500' },
                            { icon: CheckCircle, key: 'verified', color: 'text-emerald-500' }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
                                <item.icon className={`w-10 h-10 mx-auto mb-4 ${item.color}`} />
                                <h3 className="font-bold text-slate-900 mb-2">{t(`about.features.${item.key}.title`)}</h3>
                                <p className="text-sm text-slate-500">
                                    {t(`about.features.${item.key}.desc`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
