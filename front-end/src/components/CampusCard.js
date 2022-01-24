import React, { useContext } from "react";
import { Link, useLocation } from 'react-router-dom'
import { CampusesContext } from "../contexts/campusesContext";

/* Simple Campus Card component to be rendered by the all Campuses view. Since context manager manages to grab the state in time 
for the campuses view, no hacky logic from Campus.js is required. Placeholder image provided in case there url is an empty string.
While there is logic to set a default value in the backend, it doesn't kick in properly and the post requests in the frontend have
to be rewritten to better mesh with it. Until then - placeholder.

Some conditional rendering is included to modify aspects of the cards depending on where we are. Delete button only available
on campuses view, not in EditStudent view. */

export default function CampusCard(props) {
    const campus = props.campus;
    const location = useLocation();
    const origin = location.pathname;
    const cDelete = useContext(CampusesContext).deleteCampus;
    const placeholderImage = 'https://commonlook.com/wp-content/uploads/2019/05/placeholder.jpg'

    async function deleteCampus() {
        await cDelete(campus.id);
    }

    function link(to, contents) {
        return (<Link to={to} className='nav-link'>{contents}</Link>)
    }

    function mouseOverEvent(e) {
        if (e.type === 'mouseenter') {
            e.target.innerHTML = 'At Your Own Risk'
        }
        if (e.type === 'mouseleave') {
            e.target.innerHTML = 'Delete'
        }
    }

    return (
        <>
            {campus && 
            <div className="campus-card">
                <img src={campus?.imageUrl ? campus.imageUrl : placeholderImage} alt={`${campus?.name}`} />
                {link(`/campuses/${campus?.id}`, <h1>{campus?.name}</h1>)}
                {origin.startsWith('/campuses') && <button name="delete" value="delete" onClick={async () => await deleteCampus(campus.id)} onMouseEnter={e => {if(campus.id === 51) { mouseOverEvent(e) }}} onMouseLeave={e => {if(campus.id === 51) { mouseOverEvent(e) }}}>Delete</button>}
            </div>}
        </>
    )
}