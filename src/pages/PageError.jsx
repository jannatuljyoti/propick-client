import React from 'react';
import errorImage from '../assets/images.png'
import { useNavigate } from 'react-router';

const PageError = () => {
    const navigate = useNavigate();

    const handleHome=()=>{
        navigate('/');
    }

    return (
         <div className='min-h-screen flex flex-col items-center justify-center text-center px-5'>
            <img className='max-w-md w-full' src={errorImage} alt="404 Error" />

            <button onClick={handleHome} className='mt-7 bg-[#4bbafa] text-white font-semibold py-3 px-4 rounded '>Go to Homepage</button>
        </div>
    );
};

export default PageError;