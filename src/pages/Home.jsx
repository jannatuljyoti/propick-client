import React from 'react';
import SwiperSlider from '../components/SwiperSlider';
import RecentQueries from '../components/RecentQueries';

const Home = () => {
    return (
        <div>
            <section>
                <SwiperSlider></SwiperSlider>
            </section>

            <section className='mt-10'>
                <RecentQueries></RecentQueries>
            </section>
        </div>
    );
};

export default Home;