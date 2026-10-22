import React from 'react';
import Hero from '../components/hero';
import { HowItWorks } from '../components/howitworks';
import { WhyChooseUs } from '../components/whychooseus';
import { Testimonials } from '../components/testimonials';
import OurImpact from '../components/ourimpact';
import { DealerMap } from '../components/DealerMap';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <div className="bg-black text-white">
                <OurImpact />
            </div>
            <HowItWorks />
            <WhyChooseUs />
            <Testimonials />
            <DealerMap />
        </div>
    );
};

export default Home;
