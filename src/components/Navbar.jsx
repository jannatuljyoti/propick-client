import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import logo from "../assets/LogoImage.jpeg";
import userIcon from "../assets/Icon.png"

const Navbar = () => {
  const {user,logOut}=use(AuthContext);
  const [showLogout,setShowLogout]=useState(false);
  const [theme,setTheme]=useState(localStorage.getItem("theme") || "light");

  // system theme detect for default setting
  useEffect(()=>{
    if(!localStorage.getItem("theme")){
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  },[]);

  // data theme set in body if theme change
  useEffect(()=>{
    document.documentElement.setAttribute("data-theme",theme);
    localStorage.setItem("theme", theme);
  },[theme]);

 

const handleLogOut=()=>{
  console.log("User trying to logout")
  logOut().then(()=>{
    toast.success("Logged out successfully");
    setShowLogout(false);

  }).catch((error)=>{
    toast.error("Logout failed")
    console.error(error);
  });

  };


  const toggleLogout=()=>{
      setShowLogout(prev=>!prev);
  }


    const menu=(
       <>
    <li><NavLink to="/"
    className={({isActive})=>
    isActive?"text-[#4bbafa] font-semibold":""}>Home</NavLink></li>
    <li><NavLink to="/queries"
    className={({isActive})=>
    isActive?"text-[#4bbafa] font-semibold":""}>Queries</NavLink></li>
    <li><NavLink to="/about-us"
    className={({isActive})=>
    isActive?"text-[#4bbafa] font-semibold":""}>About Us</NavLink></li>
      
      {user &&(
        <>
        <li><NavLink to="/recommendations-forMe">Recommendations For Me</NavLink></li>
        <li><NavLink to="/my-queries">My Queries</NavLink></li>
        <li><NavLink to="/my-recommendations">My Recommendations</NavLink></li>
        
        </>
      )}
    </>
    )
   


    return (
  <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
  
  
  {/* logo & siteName */}
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        
        
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {menu}
      </ul>
    </div>


     <img className='w-12 h-12 rounded-full ' src={logo} alt='User'/>
    <h2  className=" text-xl">Pro<span className='text-[#4bbafa]'>Pick</span></h2>
  </div>


  {/* Center menu Items */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {menu}
    </ul>
  </div>

  {/* UserIcon, Theme Toggle & Logout  */}
  <div className="navbar-end flex items-center gap-3">
    
{/* theme toggle */}
<label className='swap swap-rotate'>
  <input type="checkbox"
  checked={theme === "dark"} 
  onChange={()=> setTheme(theme === "light" ? "dark" : "light")}/>

   {/* sun icon */}
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M5.64 17.657l-1.414-1.414 1.414 1.414zM12 5.5a6.5 6.5 0 110 13 6.5 6.5 0 010-13zm6.364 12.157l1.414-1.414-1.414 1.414zM12 3v-2m0 22v-2m9.657-9.657h2m-22 0h2M16.95 7.05l1.414-1.414-1.414 1.414zM7.05 16.95l-1.414 1.414 1.414-1.414z" />
          </svg>
          {/* moon icon */}
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M21.752 15.002A9.718 9.718 0 0112.001 22c-5.385 0-9.752-4.367-9.752-9.752 0-4.081 2.436-7.599 5.935-9.066a7.5 7.5 0 1013.568 11.82z" />
          </svg>
</label>
 
      {
        user ? (
          <div className='relative flex items-center gap-3'>
            <img
              src={`${user ? user.photoURL : userIcon}`}
               alt='User'
               className='w-8 h-8 rounded-full cursor-pointer'
               onClick={toggleLogout}
               title={user.displayName || "User"}
               />
               
               {showLogout && (
                <button onClick={handleLogOut}  className="absolute top-full mt-2 right-0 bg-[#4bbafa] text-white px-4 py-1 rounded shadow z-50">Logout</button>
               )}

          </div>
        ):(
          <Link to="/auth/login" className='btn bg-[#4bbafa]  text-white px-6 rounded'>Login</Link>
        )
      }

  </div>
</div>
    );
};

export default Navbar;