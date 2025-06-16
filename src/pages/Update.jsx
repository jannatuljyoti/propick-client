import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Loading from './Loading';

const Update = () => {
     const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/query/${id}`)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {_id, ...updatedData}=formData;
     console.log("Data being sent to update:", updatedData);

    axios.put(`http://localhost:3000/query/${id}`, updatedData)
      .then(res => {
        alert('Query updated successfully');
        navigate('/my-queries', {state: {refreshed: Date.now()}});
      })
      .catch(err => {
        console.error('Update error:',err);
        alert('Failed to update query');
      });
  };

  if (loading || !formData) return <Loading />;
    return (
         <div className='max-w-xl mx-auto p-6 bg-white shadow rounded'>
      <h2 className='text-2xl font-bold mb-4'>Update Your Query</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='queryTitle'
          value={formData.queryTitle}
          onChange={handleChange}
          placeholder='Query Title'
          className='input input-bordered w-full'
          required
        />
        <input
          type='text'
          name='productName'
          value={formData.productName}
          onChange={handleChange}
          placeholder='Product Name'
          className='input input-bordered w-full'
          required
        />
        <input
          type='text'
          name='productBrand'
          value={formData.productBrand}
          onChange={handleChange}
          placeholder='Product Brand'
          className='input input-bordered w-full'
        />
        <input
          type='text'
          name='productImage'
          value={formData.productImage}
          onChange={handleChange}
          placeholder='Image URL'
          className='input input-bordered w-full'
        />
        <textarea
          name='queryDescription'
          value={formData.queryDescription}
          onChange={handleChange}
          placeholder='Query Description'
          className='textarea textarea-bordered w-full'
        />
        <button type='submit' className='btn btn-primary w-full'>
          Update Query
        </button>
      </form>
    </div>
    );
};

export default Update;