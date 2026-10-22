import React from 'react'
import { Navbar } from './Navbar'
import Hero from './hero'
import { DealerMap } from './DealerMap'
import { Footer } from './Footer'
import { HowItWorks } from './howitworks'
import OurImpact from './ourimpact'
import { WhyChooseUs } from './whychooseus'
import { Testimonials } from './testimonials'


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <div className="container mx-auto px-0 sm:px-0 lg:px-0 max-w-[1440px] overflow-hidden">
                    <Hero />
                    <OurImpact />
                    <HowItWorks />
                    <WhyChooseUs />
                    <Testimonials />
                    <DealerMap />
                </div>
            </main>
            <Footer />
        </div>
    )
}