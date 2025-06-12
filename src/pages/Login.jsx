import React, {  use } from 'react';
import useDynamicTitle from '../hooks/dynamicTitle';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../context/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
     useDynamicTitle("Login")

  const {signIn,googleLogin}=use(AuthContext);

  const location=useLocation();
  const navigate=useNavigate();

  const handleLogin=(e)=>{
    e.preventDefault();
    const form = e.target;
    const email=form.email.value;
    const password=form.password.value;
    // console.log({email,password});

    signIn(email,password)
    .then((result)=>{
      const user = result.user;
      console.log(user);
      toast.success("Login Successfully");
 
    setTimeout(()=>{
      navigate(location.state || "/");
    },2000)
    })
    .catch((error)=>{
      toast.error(error?.message || "Something went wrong");
    });
  };

    const handleGoogleLogin=()=>{
    googleLogin()
    .then((result)=>{
      const user = result.user;
      console.log(user);
      toast.success("Google Signed in successful!")
        
    })
    .catch((error)=>{
      toast.error(error.message);
    });
  };
    return (
        <div className='flex justify-center   items-center min-h-screen '>
             <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">

                <h2 className='p-4 font-semibold text-2xl'>Login your account</h2>
      <form onSubmit={handleLogin} className="card-body">
        <fieldset className="fieldset">

          <label className="label text-xl ">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" required/>

          <label className="label text-xl ">Password</label>
          <input name='password' type="password" className="input" placeholder="Password" required/>

         <Link to="/forget">Forget Password?</Link>
          

          <button type='submit' className="btn text-white bg-[#4bbafa] mt-4">Login</button>

          <div className='flex justify-center items-center mt-3'>
           <button onClick={handleGoogleLogin} type='button'  className='btn px-21 py-4 flex items-center gap-2 bg-[#141414] text-white '>Sign up with  <FcGoogle />Google</button>
           </div>

          <p className='font-semibold text-center mt-4'>Don't Have An Account? <Link to="/auth/register" className='text-[#4bbafa]'>Register</Link></p>
        </fieldset>
      </form>
<ToastContainer position='top-center' autoClose={2000}/>

     

    </div>
        </div>
    );
};

export default Login;