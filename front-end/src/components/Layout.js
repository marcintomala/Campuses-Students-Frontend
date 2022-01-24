import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
    
export default function Layout () {
    return (
        <div className='home'>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
}