import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const LegalLayout = ({ title, lastUpdated, children }) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
                    <p className="text-slate-500 mb-8">Last Updated: {lastUpdated}</p>
                    <div className="prose prose-slate max-w-none">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export const Privacy = () => (
    <LegalLayout title="Privacy Policy" lastUpdated="January 2026">
        <p>At Junk Dealer, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our marketplace.</p>
        <h3>1. Information We Collect</h3>
        <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
        <h3>2. How We Use Your Information</h3>
        <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including arranging for shipping, and providing you with invoices and/or order confirmations).</p>
        <h3>3. Sharing Your Personal Information</h3>
        <p>We share your Personal Information with third parties to help us use your Personal Information, as described above.</p>
    </LegalLayout>
);

export const Terms = () => (
    <LegalLayout title="Terms of Service" lastUpdated="January 2026">
        <p>This website is operated by Junk Dealer. Throughout the site, the terms "we", "us" and "our" refer to Junk Dealer.</p>
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.</p>
        <h3>2. General Conditions</h3>
        <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks.</p>
    </LegalLayout>
);

export const Refund = () => (
    <LegalLayout title="Refund Policy" lastUpdated="January 2026">
        <p>Thank you for trading with Junk Dealer.</p>
        <h3>1. Returns</h3>
        <p>Due to the nature of recycled materials, we generally do not accept returns once the material has been picked up or delivered. However, if there is a discrepancy in weight or material type, please contact us immediately.</p>
        <h3>2. Refunds</h3>
        <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your original method of payment, within a certain amount of days.</p>
    </LegalLayout>
);
