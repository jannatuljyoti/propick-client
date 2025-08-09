import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase.init";
import { toast, ToastContainer } from 'react-toastify';

const AddQuery = () => {
  const [user] =useAuthState(auth);

  const[formData,setFormData]=useState({
    productName:"",
    productBrand:"",
    productImage:"",
    queryTitle:"",
    reasonDetails:"",
  });

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const queryPayload={
    ...formData,
    userEmail: user.email,
    userName: user.displayName,
    userImage: user.photoURL,
  };


  try{
    const accessToken = await user.getIdToken();

    const res = await fetch('https://propick-server.vercel.app/add-query',{
    method: "POST",
    headers:{
      'Content-Type':"application/json",
       authorization: `Bearer ${accessToken}`
    },
    body:JSON.stringify(queryPayload),
  });
 
  
  const data = await res.json();
  if(data.success){
    toast.success("Query Added Successfully");
  }else{
    toast.error("Failed to add");
  }



  }catch(error){
    console.error("Error",error);
    toast.error("Something went wrong")
  }

  }

  return (
    <div className='mt-20  '>
      <h2 className='text-2xl text-center font-bold text-[#4bbafa] mb-3'>Add Query</h2>
      <form onSubmit={handleSubmit} className='max-w-md p-6 bg-gray-100 mx-auto space-y-4 rounded shadow-2xl '>

        <input type="text" name="productName" placeholder='   productName' onChange={handleChange} required className='input input-bordered w-full'/>

        <input type="text" name="productBrand" placeholder='productBrand' onChange={handleChange} required className='input input-bordered w-full'/>

        <input type="url" name="productImage" placeholder='productImage' onChange={handleChange} required className='input input-bordered w-full'/>

        <input type="text" name="queryTitle" placeholder='queryTitle' onChange={handleChange} required className='input input-bordered w-full'/>

        <textarea 
        name='reasonDetails'
        placeholder='Boycotting Reason Details'
        onChange={handleChange} required className='textarea textarea-bordered w-full '></textarea>

        <button type='submit' className='btn text-white bg-[#4bbafa] w-full'>Add Query</button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddQuery;