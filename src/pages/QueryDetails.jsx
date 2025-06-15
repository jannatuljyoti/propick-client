import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from './Loading';
import useDynamicTitle from '../hooks/dynamicTitle';
import { toast } from 'react-toastify';

const QueryDetails = () => {
  useDynamicTitle('Query-Details')

  const {id}=useParams();
  const [query,setQuery]=useState(null);
  const [recommendations,setRecommendations]=useState([]);
  

  const [formData,setFormdata]=useState({
    title:'',
    productName:'',
    productImage:'',
    reason:''
  });

  const user={
    email:"recommender@gmail.com",
    name:"Recommender Name"
  };

  useEffect(()=>{
    axios.get(`http://localhost:3000/query/${id}`)
    .then(res=> setQuery(res.data));

    axios.get(`http://localhost:3000/recommendations?queryId=${id}`)
    .then(res=>setRecommendations(res.data))
  },[id]);


  const handleSubmit= async(e)=>{
    e.preventDefault();
 

    const recommendation={
      ...formData,
      queryId:id,
      queryTitle:query.queryTitle,
      productName:query.productName,
      userEmail:query.userEmail,
      userName:query.userName,
      recommenderEmail:user.email,
      recommenderName:user.name,
      timestamp: new Date().toISOString()
    };

    try{
      await axios.post('http://localhost:3000/add-recommendation',recommendation);

      setRecommendations(prev=>[...prev,recommendation]);

    await axios.patch(`http://localhost:3000/query-recommendation-count/${id}`);

    await new Promise(resolve=>setTimeout(resolve,500));

    
    const updated= await axios.get(`http://localhost:3000/recommendations?queryId=${id}`);
    setRecommendations(updated.data);

    const updatedQuery=await axios.get(`http://localhost:3000/query/${id}`);
    setQuery(updatedQuery.data);

      
    setFormdata({title:'', productName:'', productImage:'', reason:''});


    }catch(error){
      console.error("Error submitting:",error);
      toast.success("Something wend wrong");
    }
  };

  if(!query) return <p><Loading></Loading></p>
    

    return (
        <div className='max-w-4xl mx-auto px-4 py-10'>
          <h2 className='text-center mb-5 text-2xl font-bold text-[#4bbafa]'>Query Details</h2>
          <div className='bg-purple-100 shadow-md rounded-lg p-5 mb-7'>

            <h2 className='text-2xl font-bold mb-5'>{query.queryTitle}</h2>
            <p className='mb-3'><strong>Brand: </strong>{query.productBrand}</p>

            <p className='mb-3'><strong>Reason</strong> {query.reasonDetails}</p>

            <p><strong>Posted by:</strong> {query.userName} ({query.userEmail})</p>

          </div>

          <div className='bg-blue-100 shadow-md rounded-lg p-5 mb-7'>
            <h3 className='text-xl font-semibold mb-5'>Add a Recommendation</h3>

            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-5'>

              <input className='border p-3 rounded' placeholder='Title' value={formData.title} onChange={e=> setFormdata({...formData,title: e.target.value})}/>

              <input className='border p-3 rounded' placeholder='Product Name' value={formData.productName} onChange={e=> setFormdata({...formData, productName: e.target.value})}/>

              <input className='border p-3 rounded md:col-span-2' placeholder='Photo URL' value={formData.productImage} onChange={e=> setFormdata({...formData, productImage: e.target.value})}/>

              <textarea className='border p-3 md:col-span-2' placeholder='Reason' value={formData.reason} onChange={e=> setFormdata({...formData, reason:e.target.value})}></textarea>

              <button type='submit' className='bg-[#4bbafa] text-white py-3 px-5 rounded hover:bg-blue-700 md:col-span-2'>Add Recommendation</button>
            </form>

          </div>


          <div className='bg-blue-100 p-4 rounded'>
            <h3 className='text-xl font-semibold mb-5'>All Recommendations</h3>

            <div className='grid gap-5 sm:grid-cols-2'>
              {
                recommendations.map(re=>(
                  <div key={re._id} className='bg-gray-50 border-1-4 border-blue-400  shadow rounded-lg p-5'>

                    <img src={re.productImage} alt={re.productName} className='w-full h-48 object-cover rounded mb-5'/>

                    <h3 className='text-lg font-bold mb-3'>{re.productName}</h3>

                    <p className='mb-3'>{re.reason}</p>
                    <p className='text-sm text-gray-600'><strong>By: </strong>{re.userName}</p>

                    <p className='text-sm text-gray-600'><strong>Date: </strong>{new Date(re.timestamp).toLocaleString()}</p>

                  </div>
                ))
              }

            </div>
          </div>


        </div>
    );
};

export default QueryDetails;