import React from 'react';
import SwiperSlider from '../components/SwiperSlider';
import RecentQueries from '../components/RecentQueries';
import TopRecommendation from '../components/TopRecommendation';
import TopContributors from '../components/TopContributors';
import NewsletterSignup from '../components/NewsletterSignUp';

const Home = () => {
    return (
        <div>
            <section>
                <SwiperSlider></SwiperSlider>
            </section>

            <section className='mt-10'>
                <RecentQueries></RecentQueries>
            </section>

            <section className='mt-10'><TopRecommendation></TopRecommendation></section>

            <section className='mt-10'><TopContributors></TopContributors></section>

            <section className='mt-10'>
                <NewsletterSignup></NewsletterSignup>
            </section>
        </div>
    );
};

export default Home;