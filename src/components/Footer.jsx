import React from 'react';
import logo from "../assets/LogoImage.jpeg";
import { FaFacebook, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10 h-72 justify-center items-center gap-40">
  <aside>
    <div className='flex gap-2'>
         <img className='w-12 h-12 rounded-full ' src={logo} alt='User'/>
            <h2  className="p-3 text-xl">Pro<span className='text-[#4bbafa]'>Pick</span></h2>
    </div>
   <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <h6 className="footer-title">Social</h6>
    <div className="grid grid-flow-col gap-4">
      <a  href="https://www.facebook.com/" target='_blank' ><FaFacebook className='w-8 h-8'/></a>
       <a href="https://github.com/dashboard" target='_blank'><FaGithub className='w-8 h-8'/></a>
       <a href="https://www.youtube.com/watch?v=b_1QM4Dyy7w" target='_blank'><FaYoutube className='w-8 h-8'/></a>
    </div>
  </nav>
</footer>
    );
};

export default Footer;