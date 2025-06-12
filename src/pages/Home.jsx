import React from 'react';
import SwiperSlider from '../components/SwiperSlider';
import RecentQueries from '../components/RecentQueries';

const Home = () => {
    return (
        <div>
            <section>
                <SwiperSlider></SwiperSlider>
            </section>

            <section>
                <RecentQueries></RecentQueries>
            </section>
        </div>
    );
};

export default Home;