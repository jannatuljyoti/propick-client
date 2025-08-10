import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../pages/Loading';

const TopContributors = () => {
    const [contributor,setContributor]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        axios.get('https://propick-server.vercel.app/top-contributors')
        .then(res=>{
            setContributor(res.data);
            setLoading(false);
        })
        .catch(err=>{
            console.error(err);
            setLoading(false);
        })
    },[]);

    if(loading) return <Loading></Loading>

    return (
        <div className='py-10 bg-blue-100'>
            <h2 className='text-3xl font-bold text-center text-gray-700 mb-5'>Top Contributors</h2>

            <div className='grid md:grid-cols-3 gap-5 px-4'>
                {
                    contributor.map((user, index)=>(
                        <div key={index} className='bg-white p-5 rounded-lg shadow-md flex items-center space-x-3'>

                            <img src={user.userImage} alt={user.userName} className='w-16 h-16 rounded-full object-cover border-2 border-blue-400'/>

                            <div>
                                <h3 className='text-xl text-gray-700 font-bold'>{user.userName}</h3>
                                <p className='text-sm text-gray-500'>{user.queryCount}Queries Added</p>
                            </div>

                        </div>
                    ))
                }
            </div>
            
        </div>
    );
};

export default TopContributors;