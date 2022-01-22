import React from 'react';
import { Link } from 'react-router-dom';
    
export default function NavBar () {
    return (
            <nav className='navbar'>
                <h1 className='nav-title'>Campus Student CRUD</h1>
                <div className='nav-links'>
                    <Link to="/" className='nav-link'>Home</Link>
                    <Link to="/campuses" className='nav-link'>Campuses</Link>
                    <Link to="/students" className='nav-link'>Students</Link>
                </div>
            </nav>
    );
}