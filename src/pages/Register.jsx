import React, { use, useState } from 'react';
import useDynamicTitle from '../hooks/dynamicTitle';

import { Link, useNavigate } from 'react-router';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
      useDynamicTitle("Register")
    const {createUser,setUser,googleLogin}=use(AuthContext);

    const [showPassword, setShowPassword]=useState(false);
    const navigate =useNavigate();

    const handleRegister=(e)=>{
      e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const photo=form.photo.value;
        const email=form.email.value;
        const password=form.password.value;
        // console.log({name,photo,email,password});

         const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);


        if(password.length<8 || !upperCase || !lowerCase){
      toast.error("Password should be at least 8 characters and include uppercase & lowercase letter.");
      return;
    }

    createUser(email,password)
    .then((result)=>{
        const user=result.user;

      return  updateProfile(user,{
          displayName:name,
          photoURL:photo
        })
        .then(()=>{
          setUser({...user,displayName:name, photoURL:photo});
        toast.success("Registered successfully");
    setTimeout(()=>{
      navigate(location.state || "/");
    },2000)
        })
    })
    .catch((error)=>{
        toast.error(error.message);
    });
    };

    const handleGoogleLogin=()=>{
        googleLogin()
        .then((result)=>{
            setUser(result.user);
            toast.success("Signed in with Google")
        })
        .catch((error)=>{
            toast.error(error.message);
        });
    };


    return (
       <div className='flex justify-center   items-center min-h-screen'>
             <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5 ">

                <h2 className='font-semibold p-4 text-2xl'>Register your account</h2>
      <form onSubmit={handleRegister} className="card-body">
        <fieldset className="fieldset">

        <label className="label  text-xl">Name</label>
        <input name='name' type="text" className="input" placeholder="Your Name" />

        <label className="label  text-xl">Photo URL</label>
        <input name='photo' type="text" className="input" placeholder="Photo URL" />

          <label className="label  text-xl">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" required/>

          <label className="label  text-xl">Password</label>
          <div className='relative'>
            <input name='password' type={showPassword?'text':'password'} className="input" placeholder="Password" required/>

            <span onClick={()=>setShowPassword(!showPassword)} className='absolute top-3 right-3 cursor-pointer text-xl text-gray-600' >{showPassword ?<FaEye /> :<FaEyeSlash />}</span>
          </div>

         
          <button type='submit' className="btn text-white  bg-[#4bbafa] mt-3">Register</button>

         
        </fieldset>
      </form>

      <ToastContainer position='top-center' />

     <div className='flex justify-center items-center'>
     <button onClick={handleGoogleLogin} className='flex items-center gap-2  bg-[#141414] text-white px-18 py-2'>Sign up with  <FcGoogle />Google</button>
     </div>

      <p className='font-semibold text-center mt-3'>Already Have An Account? <Link to="/auth/login" className='text-[#4bbafa]'>Login</Link></p>
    </div>
        </div>
    );
};

export default Register;