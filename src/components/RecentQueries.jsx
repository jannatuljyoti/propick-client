import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const RecentQueries = () => {

    const [recent,setRecent]=useState([]);


    useEffect(()=>{
        const fetchQueries = async()=>{
            try{
                const res =await fetch('https://propick-server.vercel.app/recent-queries');
                const data =await res.json();
                setRecent(data);
            }catch(error){
                console.error("Failed to fetch queries:",error);
            }
        };
        fetchQueries();
    },[]);

    return (
        <div className='my-16 px-6'>
            <h2 className='text-3xl dark:text-white text-gray-700 font-bold text-center mb-7'>Recent Queries</h2>

            <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>

                {
                    recent.map((query, index)=>(
                        <div key={index}
                         className='card shadow-xl p-4 bg-white rounded-xl border border-gray-200 flex flex-col'
                         style={{height:"420px"}}>

                            <img src={query.productImage} alt={query.productName} className='w-full h-40 object-cover rounded'/>

                            <div className='mt-4 flex-grow flex flex-col justify-between'>

                                <div>
                                    <h3 className='text-xl font-semibold'>{query.queryTitle}</h3>
                                {/* <p><span className='font-bold text-gray-600'>Product:</span> {query.productName} ({query.productBrand})</p> */}

                                 <p className='mt-2 text-gray-700 text-sm'>
                                    {query.reasonDetails.length > 100
                                        ? query.reasonDetails.substring(0, 100) + "..."
                                        : query.reasonDetails}
                                </p>
                                </div>

                                

                                <div className='flex items-center justify-between mt-2'>
                                    <div className='flex gap-2'>
                                        <img src={query.userImage} alt={query.userName} className='w-8 h-8 rounded-full'/>

                                    <span className='text-sm text-gray-500'>{query.userName}</span>
                                    </div>

                                   <div>
                                     {/* See More button */}
                                <Link to={`/query/${query._id}`}><button className=' bg-[#4bbafa] text-white p-1 rounded hover:bg-blue-700'>See more</button></Link>
                                   </div>
                                </div>

                                <p>Date: {new Date(query.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    ))
                }

            </div>
            
        </div>
    );
};

export default RecentQueries;