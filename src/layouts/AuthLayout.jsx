import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const AuthLayout = () => {
    return (
        <div>
            <header className='md:container mx-auto'>
                <Navbar></Navbar>
            </header>

            <main className='md:container mx-auto'>
                <Outlet></Outlet>
            </main>

            <footer className='md:container mx-auto'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;