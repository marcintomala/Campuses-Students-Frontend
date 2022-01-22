import React from "react";
import { Link, useLocation } from 'react-router-dom'

export default function CampusCard(props) {
    const campus = props.campus;
    const location = useLocation();
    origin = location.pathname;
    console.log(campus);

    function link(to, contents) {
        return (<Link to={to} state={{ campus : campus, origin : '/campuses' }} 
                    className='nav-link'> {contents} </Link>)
    }

    return (
        <div className="campus-card">
            <img src={campus.imageUrl} alt={`${campus.name}`} />
            {link(`/campuses/${campus.id}`, <h1>{campus.name}</h1>)}
            {origin.startsWith('/campuses') && <button name="delete" value="delete" onClick={async () => await props.delete(campus.id)}>Delete</button>}
        </div>
    )
}