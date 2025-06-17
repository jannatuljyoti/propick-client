import React, { useEffect, useState } from 'react';
import useDynamicTitle from '../hooks/dynamicTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';
import Loading from './Loading';

const RecommendationsForMe = () => {
    useDynamicTitle("RecommendationForMe")

    const [user]= useAuthState(auth);
    const [recommendations,setRecommendations]=useState([]);
    const [loading, setLoading]=useState(true);


    // useEffect(()=>{
        
    //     if(user?.email){
    //         axios.get(`http://localhost:3000/recommendations-forMe?email=${user.email}`,{
    //             headers: {
    //                 authorization: `Bearer ${accessToken}`
    //             }
    //         })
    //         .then(res=>{
    //             setRecommendations(res.data);
    //             setLoading(false);
    //         })
    //         .catch(err=>{
    //             console.error(err);
    //             setLoading(false);

    //         });
    //     }
    // },[user]);

    useEffect(()=>{
        const fetchRecommendations = async()=>{
            if(user){
                try {
                    const accessToken = await user.getIdToken();

                    const res = await axios.get(`http://localhost:3000/recommendations-forMe?email=${user.email}`,{
                        headers: {
                            authorization: `Bearer ${accessToken}`
                        }
                    });

                    setRecommendations(res.data);
                }catch(error){
                    console.error("Error fetching recommendations:",error);
                }finally{
                    setLoading(false);
                }
            }
        };
        fetchRecommendations();
    },[user]);

    if(loading) return <Loading></Loading>

    return (
        <div className='p-7 min-h-screen bg-blue-50'>

            <h2 className='text-2xl text-center rounded p-5 bg-base-100 text-[#4bbafa] font-bold mb-5'>Recommendation for me</h2>

            {
                recommendations.length===0?(
                    <p>No recommendations yet</p>
                ):(
                    <div className='overflow-x-auto bg-base-100 shadow-lg'>
                        <table className='min-w-full table-auto
                        border border-blue-300'>

                            <thead className='bg-base-100 border-blue-300 text-left'>

                                <tr>
                                    <th className='px-4 text-blue-400 py-3 border border-blue-300'>Product Name</th>

                                    <th className='px-4 py-3 text-blue-400  border border-blue-300'>Product Image</th>

                                    <th className='px-4 text-blue-400  py-3 border border-blue-300'>Reason</th>

                                    <th className='px-4 text-blue-400  py-3 border border-blue-300'>Recommended By</th>
                                </tr>

                            </thead>

                            <tbody>
                                {
                                    recommendations.map((re,index)=>(
                                        <tr key={index} className='hover:bg-gray-50'>
                                            <td className='px-4 py-3 border border-blue-300'>{re.productName}</td>

                                            <td className='px-4 py-3 border border-blue-300'>
                                                <img src={re.productImage} alt={re.productName} className='w-16 h-16 rounded-md object-cover'/>
                                            </td>

                                            <td className='px-4 py-3 border border-blue-300'>{re.reason}</td>

                                            <td className='px-4 py-3 border border-blue-300'>{re.recommenderName}</td>

                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>

                    </div>
                )
            }

            
         
        </div>
    );
};

export default RecommendationsForMe;