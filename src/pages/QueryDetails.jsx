import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from './Loading';
import useDynamicTitle from '../hooks/dynamicTitle';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase.init';

const QueryDetails = () => {
  useDynamicTitle('Query-Details')

  const [currentUser]=useAuthState(auth);
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
    
    email:currentUser?.email,
    name:currentUser?.displayName || "Anonymous",
    
    photoURL:currentUser?.photoURL || ''
  };

  useEffect(()=>{
    axios.get(`http://localhost:3000/query/${id}`)
    .then(res=> setQuery(res.data));

    axios.get(`http://localhost:3000/recommendations?queryId=${id}`)
    .then(res=>setRecommendations(res.data))
  },[id]);


  const handleSubmit= async(e)=>{
    e.preventDefault();
 
    console.log('user:', user);
  console.log('query:', query);
  console.log('formData:', formData);

  if(!query || !user.email){
    toast.error("User or Query data missing.");
    return;
  }

    const recommendation={
      ...formData,
      queryId:id,
      queryTitle:query.queryTitle,
      productName:query.productName,
      userEmail:query.userEmail,
      userName:query.userName,
      userImage:user.photoURL,
      recommenderEmail:user.email,
      recommenderName:user?.name,
     
    };

    try{
      await axios.post('http://localhost:3000/add-recommendation',recommendation);

      // setRecommendations(prev=>[...prev,recommendation]);

    await axios.patch(`http://localhost:3000/query-recommendation-count/${id}`);

    // await new Promise(resolve=>setTimeout(resolve,500));

    
    const updated= await axios.get(`http://localhost:3000/recommendations?queryId=${id}`);
    setRecommendations(updated.data);

    const updatedQuery=await axios.get(`http://localhost:3000/query/${id}`);
    setQuery(updatedQuery.data);

      
    setFormdata({title:'', productName:'', productImage:'', reason:''});

    toast.success('Recommendation added')

    }catch(error){
      console.error("Error submitting:",error);
      toast.error("Something wend wrong");
    }
  };

  if(!query) return <div><Loading></Loading></div>
    

    return (
        <div className='max-w-4xl mx-auto px-4 py-10'>
          <h2 className='text-center mb-5 text-2xl font-bold text-[#4bbafa]'>Query Details</h2>
          <div className='bg-purple-100 shadow-md rounded-lg p-5 mb-7'>

            <h2 className='text-2xl font-bold mb-5'>{query.queryTitle}</h2>
            <p className='mb-3'><strong>Brand: </strong>{query.productBrand}</p>
            <p className='mb-3'><strong>Description: </strong>{query.queryDescription}</p>

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

                    <img src={re.userImage} alt='user' className='w-10 h-10 rounded-full' />

                    <p className='mb-3'>{re.reason}</p>
                    <p className='text-sm text-gray-600'><strong>By: </strong>{re.recommenderName}</p>
                    <p className='text-sm text-gray-600'><strong>Email: </strong>{re.recommenderEmail}</p>

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