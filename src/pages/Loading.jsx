import React from 'react';
import useDynamicTitle from '../hooks/dynamicTitle';



const Loading = () => {
    useDynamicTitle("Loading")
    return (
        <div className='min-h-screen flex justify-center items-center'>
        <span className="loading loading-ring loading-xl"></span>    
        </div>
    );
};

export default Loading;