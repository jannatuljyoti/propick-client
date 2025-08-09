import React, { useState } from 'react';
import { HiMail } from "react-icons/hi";

const NewsletterSignUp = () => {
    const [email, setEmail]=useState("");
    const [message, setMessage]=useState("");

    const handleSubmit =(e)=>{
        e.preventDefault();

        if(!email){
            setMessage("Please enter email");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            setMessage("Please enter valid address");
            return;
        }

        setMessage("Thank you for subscribing!");
        setEmail("");
    };


    return (
        <div>
    <section className="w-full bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 py-16 px-6 shadow-lg text-white">
                  <h2 className="text-3xl text-gray-700 font-extrabold mb-4 text-center">Stay Updated</h2>

                 <p className="text-center text-gray-700 mb-8 text-lg max-w-4xl mx-auto"> Subscribe to our newsletter to get the latest product queries, recommendations, and updates.</p>

                <form onSubmit={handleSubmit}
                className='flex max-w-xl mx-auto bg-white rounded-md overflow-hidden'>

                    <div className="flex items-center px-3 border-r border-gray-300 text-gray-600">
                      <HiMail className="w-6 h-6" />
                    </div>

                    <input type="text"
                    placeholder='Enter email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                   className="flex-grow px-4 py-3 focus:outline-none" />
                   <button type='button'
                    className="bg-blue-500 hover:bg-blue-800 transition px-6 text-white font-semibold"
                   >
                    Subscribe
                   </button>

                </form>

                {message && (
                    <p className='mt-4 text-center font-semibold'>{message}</p>
                )}
            </section>
        </div>
    );
};

export default NewsletterSignUp;