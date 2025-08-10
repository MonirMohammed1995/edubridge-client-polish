import React from 'react';
import Banner from '../components/Banner';
import StateSections from '../components/StateSections';
import { Helmet } from 'react-helmet';
import LanguageCategory from '../components/LanguageCategory';
import Testimonials from '../components/Testimonials';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
    return (
        <div className='max-w-[2560px] mx-auto'>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner/>
            <StateSections/>
            <LanguageCategory/>
            <Testimonials/>
            <WhyChooseUs/>
        </div>
    );
};

export default Home;