import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { Link } from 'react-router';
import useDynamicTitle from '../hooks/dynamicTitle';

const Queries = () => {
    useDynamicTitle("Queries")

    const[queries,setQueries]=useState([]);
    const [filterQueries,setFilterQueries]=useState([]);
    const [loading,setLoading]=useState(true);
    const[search,setSearch]=useState('');
    const [gridCol,setGridCol]=useState(3);


    useEffect(()=>{
        axios.get('https://propick-server.vercel.app/all-queries')
        .then(res=>{
            setQueries(res.data);
            setFilterQueries(res.data);
            setLoading(false);
        })
        .catch(err=>{
            console.error('Error loading:',err);
            setLoading(false);
        })
    },[]); 

    const handleSearch=(e)=>{
        const text = e.target.value.toLowerCase();
        setSearch(text);
        const matched = queries.filter(query=>
            query.productName.toLowerCase().includes(text)
        );
        setFilterQueries(matched);
    }


     const handleSortByRecommendation = () =>{
        const sorted = [...filterQueries].sort((a,b) => b.recommendationCount - a.recommendationCount);
        setFilterQueries(sorted);
     }

    if (loading) return <Loading></Loading>

    return (
        <div className='px-5 py-11 bg-gray-100 min-h-screen'>
            <h1 className='text-3xl font-bold mt-10 mb-5 text-center text-[#4bbafa]'>All Queries</h1>

            {/* search input */}
            <div className='max-w-md mx-auto mb-5'>
                <input type="text"
                value={search} 
                onChange={handleSearch}
                placeholder='Search by Product Name...'
                className='input input-bordered w-full'
                />
            </div>


            {/* Layout Toggle Buttons */}
            <div className='flex justify-center  gap-3 mb-6'>
                <button 
                onClick={()=> setGridCol(1)}
                className={`btn bg-base-100 shadow btn-sm ${gridCol == 1? 'bg-blue-500 text-white' :  ''}`}>1 Col</button>

                <button 
                onClick={()=> setGridCol(2)}
                className={`btn bg-base-100 shadow btn-sm ${gridCol == 2? 'bg-blue-500 text-white' :  ''}`}>2 Col</button>

                <button 
                onClick={()=> setGridCol(3)}
                className={`btn bg-base-100 shadow btn-sm ${gridCol == 3? 'bg-blue-500 text-white' :  ''}`}>3 Col</button>

                 <button
                  onClick={handleSortByRecommendation}
                  className='btn btn-sm bg-base-100 shadow  hover:bg-blue-500 hover:text-white'>
                  Sort by Recommendations
                </button>

            </div>
         

         {/* Queries Grid */}
         {filterQueries.length===0?(
            <div className='text-center text-lg'>No Queries found</div>
         ):(
            <div className={`grid gap-5 ${
                gridCol === 1? 'grid-cols-1' :
                gridCol === 2? 'sm:grid-cols-2' :
                'sm:grid-cols-2 lg:grid-cols-3'
            }`}>

                {
                    filterQueries.map(query=>(
                        <div key={query._id} className='bg-white rounded-xl shadow flex flex-col  h-[500px] p-6'>

                       <div className='flex-1'>
                         <img src={query.productImage} alt={query.productName} className='w-full h-52 object-cover rounded mb-5'/>  

                        <h2 className='text-xl font-semibold mb-2'>{query.queryTitle}</h2>

                        <p className='text-sm text-gray-600 mb-2'><strong>Brand: </strong>{query.productBrand}</p>  

                        <p className='text-sm text-gray-600 mb-3'><strong>Reason:</strong>{query.reasonDetails.slice(0, 100)}...</p> 

                        <p className='text-sm text-gray-600 mb-2'><strong>Recommendations:</strong>{query.recommendationCount}</p>  
                       </div>

                        <Link to={`/query/${query._id}`}><button className='w-full bg-[#4bbafa] text-white py-2 rounded hover:bg-blue-700'>Recommend</button></Link>



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