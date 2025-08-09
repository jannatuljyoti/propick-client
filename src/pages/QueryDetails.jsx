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
    axios.get(`https://propick-server.vercel.app/query/${id}`)
    .then(res=> setQuery(res.data));

    axios.get(`https://propick-server.vercel.app/recommendations?queryId=${id}`)
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
      productName:formData.productName,
      productImage:formData.productImage,
      reason:formData.reason,
      userEmail:user.userEmail,
      userName:user.userName,
      userImage:user.photoURL,
      recommenderEmail:user.email,
      recommenderName:user?.name,
     
    };

    try{
      await axios.post('https://propick-server.vercel.app/add-recommendation',recommendation);

      // setRecommendations(prev=>[...prev,recommendation]);

    await axios.patch(`https://propick-server.vercel.app/query-recommendation-count/${id}`);

    // await new Promise(resolve=>setTimeout(resolve,500));

    
    const updated= await axios.get(`https://propick-server.vercel.app/recommendations?queryId=${id}`);
    setRecommendations(updated.data);

    const updatedQuery=await axios.get(`https://propick-server.vercel.app/query/${id}`);
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

            <p className='mb-3'><strong>Posted by:</strong> {query.userName} ({query.userEmail})</p>

            <p><strong>Recommendation Count: </strong> {query.recommendationCount} </p>

          </div>

          <div className='bg-blue-100 shadow-md rounded-lg p-5 mb-7'>
            <h3 className='text-xl font-semibold mb-5'>Add a Recommendation</h3>

            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-5'>

              <input className='border border-blue-500 p-3 rounded' placeholder='Title' value={formData.title} onChange={e=> setFormdata({...formData,title: e.target.value})}/>

              <input className='border border-blue-500 p-3 rounded' placeholder='Product Name' value={formData.productName} onChange={e=> setFormdata({...formData, productName: e.target.value})}/>

              <input className='border border-blue-500 p-3 rounded md:col-span-2' placeholder='Photo URL' value={formData.productImage} onChange={e=> setFormdata({...formData, productImage: e.target.value})}/>

              <textarea className='border border-blue-500 p-3 md:col-span-2' placeholder='Reason' value={formData.reason} onChange={e=> setFormdata({...formData, reason:e.target.value})}></textarea>

              <button type='submit' className='bg-[#4bbafa] text-white py-3 px-5 rounded hover:bg-blue-700 md:col-span-2'>Add Recommendation</button>
            </form>

          </div>


          <div className='bg-blue-100 p-4 rounded'>
            <h3 className='text-xl font-semibold mb-5'>All Recommendations</h3>

            <div className='grid gap-5 sm:grid-cols-2'>
              {
                recommendations.map(re=>(
                  <div key={re._id} className='flex items-start gap-3 bg-white p-3 rounded-lg shadow border border-blue-200'>
                    <img src={re.userImage} alt="user" className='w-12 h-12 rounded-full object-cover'/>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>

                        <h4 className='font-semibold text-gray-800'>{re.recommenderName}</h4>

                        <span className='text-sm text-gray-500'>{new Date(re.timestamp).toLocaleString()}</span>

                      </div>

                      <p className='text-gray-700 mb-2 whitespace-pre-line'><span className='font-bold'>Reason:</span> {re.reason}</p>
                      <p><span className='font-bold'>ProductName: </span>{re.productName}</p>

                    </div>

                  </div>
                ))
              }

            </div>
          </div>


        </div>
    );
};

export default QueryDetails;