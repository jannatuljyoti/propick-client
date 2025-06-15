import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { Link } from 'react-router';

const Queries = () => {

    const[queries,setQueries]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        axios.get('http://localhost:3000/all-queries')
        .then(res=>{
            setQueries(res.data);
            setLoading(false);
        })
        .catch(err=>{
            console.error('Error loading:',err);
            setLoading(false);
        })
    },[]);

    // const handleRecommendations= async(id) =>{
    //     try{
    //         const res = await axios.patch(`http://localhost:3000/recommend/${id}`)
    //         if(res.data.success){
    //              setQueries(prev=>
    //                 prev.map(query=>query._id===id?{...query, recommendationCount:query.recommendationCount + 1}: query)
    //              );
    //         }
    //     }catch(error){
    //         console.error("Error recommendation:",error)
    //     }
    // }

    if (loading) return <Loading></Loading>

    return (
        <div className='px-5 py-11 bg-gray-100 min-h-screen'>
            <h1 className='text-3xl font-bold mb-5 text-center'>All Queries</h1>
         
         {queries.length===0?(
            <div className='text-center text-lg'>No Queries found</div>
         ):(
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>

                {
                    queries.map(query=>(
                        <div key={query._id} className='bg-white rounded-xl shadow flex flex-col  h-[500px] p-6'>

                       <div className='flex-1'>
                         <img src={query.productImage} alt={query.productName} className='w-full h-52 object-cover rounded mb-5'/>  

                        <h2 className='text-xl font-semibold mb-2'>{query.queryTitle}</h2>

                        <p className='text-sm text-gray-600 mb-2'><strong>Brand: </strong>{query.productBrand}</p>  

                        <p className='text-sm text-gray-600 mb-3'><strong>Reason:</strong>{query.reasonDetails.slice(0, 100)}...</p> 

                        <p className='text-sm text-gray-600 mb-2'><strong>Recommendations:</strong>{query.recommendationCount}</p>  
                       </div>

                        <Link to={`/query/${query._id}`}><button className='w-full bg-[#4bbafa] text-white py-3 rounded hover:bg-blue-700'>Recommend</button></Link>



                        </div>
                    ))
                }

            </div>
         )
         }
        </div>
    );
};

export default Queries;