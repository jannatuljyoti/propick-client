import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase.init";
import useDynamicTitle from '../hooks/dynamicTitle';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const MyRecommendations = () => {
    useDynamicTitle("MyRecommendations");

    const [user]=useAuthState(auth);
    const [recommendations,setRecommendations]=useState([]);

    useEffect(()=>{
        if(user?.email){
            axios.get(`http://localhost:3000/my-recommendations/${user.email}`)
            .then(res=>setRecommendations(res.data))
            .catch(err=>console.error(err));
        }
    },[user]);

    const handleDelete=(id)=>{
        const confirmDelete=window.confirm('Are you sure you want to delete this?');
        if(!confirmDelete) return;

        axios.delete(`http://localhost:3000/recommendations/${id}`)
        .then(res=>{
            toast.success('Deleted successfully');
            setRecommendations(prev=>prev.filter(r=>r._id !==id));

        })
        .catch(err=>{
            console.error(err);
            toast.error('Delete Failed');
        });
    };

    return (
        <div className='p-7 bg-gray-100 min-h-screen'>
            <h2 className='bg-base-100 p-3 rounded text-2xl text-center text-[#4bbafa] font-bold mb-5'>My Recommendations</h2>
            <div className='overflow-x-auto bg-base-100 shadow-md'>
                <table className='table-fixed w-full  border border-collapse border-sky-400 '>
                    <thead className='bg-base-100 '>
                        <tr>
                            <th className='w-1/4 p-3 border border-sky-400  text-left'>Title</th>
                            <th className='w-1/4 p-3 border border-sky-400 text-left'>Product Name</th>
                            <th className='w-1/4 p-3 border border-sky-400 text-left'>Reason</th>
                            <th className='w-1/4 p-3 border border-sky-400  text-left'>Action</th>
                        </tr>

                    </thead>

                    <tbody>
                        {
                            recommendations.map((re)=>(
                                <tr key={re._id}>

                                    <td className= 'w-1/4 p-3 border border-sky-400 align-top'>{re.queryTitle}</td>
                                    <td className='w-1/4 p-3 border border-sky-400 align-top'>{re.productName}</td>
                                    <td className='w-1/4 p-3 border border-sky-400 align-top break-words'>{re.reason}</td>
                                    <td className='w-1/4 p-3 border border-sky-400 align-top'>
                                        <button onClick={()=>handleDelete(re._id)} className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-red-600'>Delete</button>
                                    </td>

                                </tr>
                                
                            ))
                        }
                        {
                            recommendations.length=== 0 && (
                                <tr>
                                    <td colSpan="5" className='text-center p-5 text-gray-500' >
                                        No recommendation found
                                    </td>
                                </tr>
                            )
                        }
                          <ToastContainer></ToastContainer>
                    </tbody>
                  

                </table>

            </div>
           
        </div>
    );
};

export default MyRecommendations;