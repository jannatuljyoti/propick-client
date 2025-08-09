import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const mainLayout = () => {
    return (
        <div>
            <header  >
                <Navbar></Navbar>
            </header>

      <main className='min-h-screen mx-auto'><Outlet></Outlet></main>

            <footer  >
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default mainLayout;