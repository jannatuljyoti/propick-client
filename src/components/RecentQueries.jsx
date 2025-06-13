import React, { useEffect, useState } from 'react';

const RecentQueries = () => {

    const [recent,setRecent]=useState([]);

    useEffect(()=>{
        const fetchQueries = async()=>{
            try{
                const res =await fetch('http://localhost:3000/recent-queries');
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
            <h2 className='text-3xl font-bold text-center mb-7'>Recent Queries</h2>

            <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>

                {
                    recent.map((query, index)=>(
                        <div key={index} className='card shadow-xl p-4 bg-white rounded-xl border border-gray-200'>

                            <img src={query.productImage} alt={query.productName} className='w-full h-40 object-cover rounded'/>

                            <div className='mt-4 space-y-2'>

                                <h3 className='text-xl font-semibold'>{query.queryTitle}</h3>
                                <p><span className='font-bold text-gray-600'>Product:</span> {query.productName} ({query.productBrand})</p>

                                <p><span className='font-bold text-gray-600'>Reason:</span> {query.reasonDetails}</p>

                                <div className='flex items-center gap-2 mt-2'>
                                    <img src={query.userImage} alt={query.userName} className='w-8 h-8 rounded-full'/>

                                    <span className='text-sm text-gray-500'>{query.userName}</span>
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