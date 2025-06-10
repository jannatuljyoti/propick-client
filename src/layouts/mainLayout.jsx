import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const mainLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>

            <Outlet></Outlet>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default mainLayout;