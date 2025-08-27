import React from 'react';
import Banner from '../components/Banner';
import StateSections from '../components/StateSections';
import { Helmet } from 'react-helmet';
import LanguageCategory from '../components/LanguageCategory';
import Testimonials from '../components/Testimonials';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedTutors from './FeaturedTutors';
import PricingPlans from './PricingPlans';
import FaqSection from './FaqSection';
import CallToAction from './CallToAction';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Language Exchange</title>
            </Helmet>

            {/* Banner */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <Banner/>
            </motion.div>

            {/* Platform Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <StateSections/>
            </motion.div>

            {/* Language Categories */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <LanguageCategory/>
            </motion.div>

            {/* Featured Tutors */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <FeaturedTutors/>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <Testimonials/>
            </motion.div>

            {/* Pricing Plans */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <PricingPlans/>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <WhyChooseUs/>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <FaqSection/>
            </motion.div>

            {/* Call To Action */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <CallToAction/>
            </motion.div>
        </div>
    );
};

export default Home;
