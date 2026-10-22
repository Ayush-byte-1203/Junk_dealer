import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const Contact = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Have questions about scrap rates, pickups, or business partnerships? We're here to help.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                                <Mail className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                                <p className="text-slate-500 text-sm mb-2">For general inquiries</p>
                                <a href="mailto:support@junkdealer.com" className="text-emerald-600 font-medium hover:underline">support@junkdealer.com</a>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                <Phone className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                                <p className="text-slate-500 text-sm mb-2">Mon-Sat from 9am to 6pm</p>
                                <a href="tel:+919876543210" className="text-blue-600 font-medium hover:underline">+91 987 654 3210</a>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">Visit Us</h3>
                                <p className="text-slate-500 text-sm">
                                    123 Green Earth Road<br />
                                    Eco City, Earth 404
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will get back to you soon.'); }}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">First Name</label>
                                    <Input placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                                    <Input placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                <Input type="email" placeholder="john@example.com" required />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Subject</label>
                                <Input placeholder="How can we help?" required />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Message</label>
                                <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[150px]" required />
                            </div>

                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-base">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
