import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase.init";
import useDynamicTitle from '../hooks/dynamicTitle';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from './Loading';
import bannerImg from '../assets/banner.jpg'

const MyQueries = () => {
    const [user,loading]=useAuthState(auth);
    const [query,setQuery]=useState([]);
    const[fetching, setFetching]=useState(true);
    const location = useLocation();
    const navigate= useNavigate();

    useDynamicTitle("My Queries");

    useEffect(()=>{
        const fetchQueries = async()=>{
            if(user){
                try {
                    const accessToken = await user.getIdToken();

                    const res = await axios.get(`https://propick-server.vercel.app/my-queries?email=${user.email}`,{
                        headers: {
                            authorization: `Bearer ${accessToken}`
                        }
                    });

                    setQuery(res.data);
                    setFetching(false);
                }catch(error){
                    console.error(error);
                    toast.error("Failed to load:",error);
                   
                }finally{
                     setFetching(false);
                }
            }
        };
        fetchQueries();
    },[user, location.state?.refreshed]);


    const handleDelete=id=>{
        const confirmDelete=window.confirm('Are you sure you want to delete this query?');
        if(!confirmDelete) return;

        axios.delete(`https://propick-server.vercel.app/query/${id}`)
        .then(res=>{
            if(res.data.success){
                setQuery(prev=> prev.filter(q=>q._id !==id));
                toast.success('Query deleted successfully');
            }
        })
        .catch(err=>{
            console.error(err);
            toast.error('Failed to delete ');
        });
    };

    if(loading || fetching){
        return <Loading></Loading>
    }

    if(!user){
        return <p>Please log in to view your queries</p>
    }

    return (
        <div className='max-w-7xl mx-auto px-5 py-12'>
        {/* <Link to="/add-query" className="btn btn-accent">Add New Query</Link> */}

        {/* Banner Section */}
        <div className='bg-gray-100 shadow-md p-5 rounded-lg text-center mb-7'>
            <h2 className='text-3xl text-[#4bbafa]  mb-7 font-bold'>My Queries</h2>

            <img className='mb-7 w-full rounded-lg p-4' src={bannerImg} alt="banner" />

            <button onClick={()=> navigate('/add-query')}
                className='mt-4 px-7 py-3 bg-[#4bbafa] text-white rounded hover:bg-blue-700'>Add New Query</button>

        </div>

        {/* my queries */}

        {
            query.length===0?(
                <div className='text-center'>
                    <p className='text-gray-500 mb-4'>You haven't added any queries yet.</p>
                    <button
                    onClick={()=>navigate('/add-query')}
                    className='px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700'>Add a Query</button>
                </div>
            ):(<div className='bg-blue-100 p-7 rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

                {
                    query.map(queries=>(
                        <div key={queries._id} className='bg-white p-5 shadow rounded flex flex-col justify-between'>
                        
                        <img src={queries.productImage} alt={queries.productName} className='w-full h-40 object-cover rounded mb-3'/>

                        <h3 className='text-xl font-semibold mb-2'>{queries.queryTitle}</h3>

                        <p className='text-gray-600 text-sm mb-2'>Brand: {queries.productBrand}</p>

                        <p>Added on: {new Date(queries.timestamp).toLocaleString()}</p>


                        <div className='mt-5  flex gap-3'>

                            <button onClick={()=>navigate(`/query/${queries._id}`)} className='px-4 py-2 bg-[#4bbafa] text-white rounded hover:bg-yellow-600 w-full '>View</button>

                            <button onClick={()=>navigate(`/update-query/${queries._id}`)} className='px-4 py-2 bg-[#4bbafa] text-white rounded hover:bg-yellow-600 w-full'>Update</button>

                            <button onClick={()=>handleDelete(queries._id)} className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full'>Delete</button>
                        </div>

                        </div>
                    ))
                }


            </div>
                
                
                )
        }

        </div>
    );
};

export default MyQueries;