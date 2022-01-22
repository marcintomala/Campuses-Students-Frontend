import React from 'react';
import NavBar from './NavBar';
import HomePage from './HomePage';
import { Outlet, useLocation } from 'react-router-dom';
    
export default function Home () {
    const location = useLocation();
    const origin = location.pathname;
    return (
        <div className='home'>
            <NavBar />
            <Outlet />  
            {origin === '/' && <HomePage />}
        </div>
    );
}