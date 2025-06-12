import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const SwiperSlider = () => {
    const slides=[
        {
            title:"Welcome to Product Recommendation System",
           description: "Ask queries, explore suggestions, and help others make better product choices.",
           image:"https://i.ibb.co/nNDMLPwK/istockphoto-968108284-612x612.jpg"
        },
        {
            title:"Post Your Product Queries",
             description: "Easily share your doubts about any product. Let the community support you!",
             image:'https://i.ibb.co/s9qWC4hH/istockphoto-1451079337-612x612.jpg'
        },
        {
            title:"Get real Recommendations",
           description: "Explore suggestions from real users with real experiences.",
           image:"https://i.ibb.co/XkvNHByb/istockphoto-2151224243-612x612.jpg"
        },
    ];

    return (
        <div className='w-full h-[80vh]'>
            <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay:3000,
                disableOnInteraction:false,
            }}
            pagination={{
                clickable:true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className='mySwiper h-full'>

            {slides.map((slide, index)=>(
                <SwiperSlide key={index}>
                    <div className='relative w-full h-[80vh]'>
                        <img src={slide.image} alt={slide.title} className='absolute top-0 left-0 w-full h-full object-cover '/>

                        <div className='relative z-10 h-full flex flex-col  rounded-2xl items-center justify-center text-white px-4 sm:px-6 md:px-10 bg-black/50'>

                            <h2 className='text-4xl text-white md:text-5xl font-bold mb-4'>{slide.title}</h2>

                            <p className='text-lg text-white font-semibold md:text-xl'>{slide.description}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            </Swiper>
            
        </div>
    );
};

export default SwiperSlider;