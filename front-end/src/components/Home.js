import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='homepage'>
            <h1>Welcome to the Campuses-Students CRUD App!</h1>
            <h2>This app allows you to access and modify a database of students and campuses.</h2>
            <div className='home-list'>
                <ul>
                    <li><Link to='/campuses' className='body-link'>Click here</Link> if you want to explore the campuses. While there, you can:
                        <ul>
                            <li>See each campus' profile by clicking on its name.</li>
                            <li>While there, you can see the students enrolled in the campus or edit it.</li>
                            <li>Of course, if you want, you can also <strong>delete</strong> the campus. Well, <em>most</em> of them, anyway... 😉</li>
                        </ul>
                    </li>
                    <li>By clicking <Link to='/students' className='body-link'>here</Link> instead, you can explore the students. While there, you can:
                        <ul>
                            <li>See each student's profile by clicking on their name.</li>
                            <li>Each student has their information and campus (if they have one) included in their profile.</li>
                            <li>You can also delete students! Yes, <strong>all</strong> of them this time.</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}