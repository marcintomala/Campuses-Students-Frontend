import React from "react";
import { Link } from 'react-router-dom'

export default function CampusCard(props) {
    const campus = props.campus;
    
    return (
        <div className="campus-card">
            <img src={campus.imageUrl} alt={`${campus.name}`} />
            <Link
                to={`/campuses/${campus.id}`}
                state={{campus : campus, origin : '/campuses'}}
            >
                <h1>{campus.name}</h1>
            </Link>
            <Link 
                to={`/campuses/${campus.id}/edit`} 
                state={{ campus : campus, origin : '/campuses' }} 
                className='nav-link'
            >
                Edit Campus
            </Link>
            <button name="delete" value="delete" onClick={async () => await props.delete(campus.id)}>Delete</button>
        </div>
    )
}