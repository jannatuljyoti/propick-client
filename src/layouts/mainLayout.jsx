import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const mainLayout = () => {
    return (
        <div>
            <header  className='md:container mx-auto'>
                <Navbar></Navbar>
            </header>

      <main className='min-h-screen mx-auto'><Outlet></Outlet></main>

            <footer  className='md:container mx-auto '>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default mainLayout;