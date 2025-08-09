import Aos from 'aos';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';


const TopRecommendation = () => {
    const [queries,setQueries]=useState([]);

    useEffect(()=>{

        Aos.init({duration:2000,once:true})

        axios.get('https://propick-server.vercel.app/top-recommended-queries')
        .then(res=>setQueries(res.data))
        .catch(err=>console.error(err));
    },[]);

    return (
        <div className='py-10 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100'>

        <h2 className='text-4xl font-extrabold text-center text-[#4bbafa] mb-10 tracking-wide'>Top Recommended products</h2>   

        <div className='grid gap-8 md:grid-cols-3 px-4'>

            {
                queries.map((query,index)=>(
                    <div key={query._id}
                    data-aos='fade-up'
                    data-aos-delay={index * 100}
                    className='bg-white rounded-2xl shadow-xl p-5 transform hover:scale-105 transition duration-300 border-t-4 border-purple-400'>

                    <img src={query.productImage} alt={query.productName} 
                    className='w-full h-48 object-cover rounded-lg mb-4 shadow-sm'/> 

                    <h3 className='text-2xl font-bold text-gray-800 mb-2'>{query.productName}</h3>  

                    <p>Brand: <span className='font-medium text-black'>{query.productBrand}</span></p> 

                    <p className='text-purple-500 font-semibold text-lg'>⭐{query.recommendationCount} Recommendations</p>

                    </div>
                ))
            }
            
        </div> 
            
        </div>
    );
};

export default TopRecommendation;