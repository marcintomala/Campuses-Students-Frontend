import React from 'react';
import { Link } from 'react-router-dom';
    
export default function NavBar () {
    return (
        <div>
            <nav className='navbar'>
            <h1 className='nav-title'>Campus Student CRUD</h1>
                <div className='nav-links'>
                    <Link to="/" className='home-link'>Home</Link>
                    <Link to="/students" className='student-link'>Students</Link>
                    <Link to="/campuses" className='campus-link'>Campuses</Link>
                </div>
            </nav>
        </div>
    );
}