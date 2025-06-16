import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import Loading from './Loading';

const Update = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData]= useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get(`http://localhost:3000/query/${id}`)
      .then(res=>{
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err=>{
        console.error(err);
        setLoading(false);
      });
  },[id]);

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();

    const {_id, ...updatedData} = formData;
    console.log("Data being sent to update:", updatedData);

    axios.put(`http://localhost:3000/query/${id}`, updatedData)
    .then(res=>{
      toast.success('Query updated Successfully');

      setTimeout(()=>{
        navigate('/my-queries', {state: {refreshed: Date.now()}});
      },2000);
      

    })
    .catch(err=>{
      console.error('Update error:', err);
      toast.error('Failed to update query')
    });
  };

  if (loading || !formData) return <Loading></Loading>

  return (
    <div className='max-w-xl mt-10 mx-auto p-5 bg-blue-50 shadow rounded'>

      <h2 className='text-2xl text-center text-blue-400 font-bold mb-5'>Update Your Query</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>

        <input type="text"  name='queryTitle'
        value={formData.queryTitle}
        onChange={handleChange}
        placeholder='Query Title'
        className='input input-bordered w-full'
        required/>

        <input type="text"  name='productName'
        value={formData.productName}
        onChange={handleChange}
        placeholder='Product Name'
        className='input input-bordered w-full'
        required/>

        <input type="text"  name='productBrand'
        value={formData.productBrand}
        onChange={handleChange}
        placeholder='Product Brand'
        className='input input-bordered w-full'
        required/>

        <input type="text"  name='productImage'
        value={formData.productImage}
        onChange={handleChange}
        placeholder='Photo URL'
        className='input input-bordered w-full'
        required/>

        <textarea   name='queryDescription'
        value={formData.queryDescription}
        onChange={handleChange}
        placeholder='Query Description'
        className='textarea textarea-bordered w-full'
        required/>

       <button type='submit' className='btn text-white rounded bg-blue-400 w-full'>Update Query</button>

      </form>

     <ToastContainer></ToastContainer>
      
    </div>
  );
};

export default Update;