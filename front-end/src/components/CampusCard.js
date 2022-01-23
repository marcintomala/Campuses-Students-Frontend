import React, { useContext } from "react";
import { Link, useLocation } from 'react-router-dom'
import { CampusesContext } from "../contexts/campusesContext";

export default function CampusCard(props) {
    const campus = props.campus;
    const location = useLocation();
    const origin = location.pathname;
    const cDelete = useContext(CampusesContext).deleteCampus;

    async function deleteCampus() {
        await cDelete(campus.id);
    }

    function link(to, contents) {
        return (<Link to={to} className='nav-link'> {contents} </Link>)
    }

    return (
        <div className="campus-card">
            <img src={campus.imageUrl} alt={`${campus.name}`} />
            {link(`/campuses/${campus.id}`, <h1>{campus.name}</h1>)}
            {origin.startsWith('/campuses') && <button name="delete" value="delete" onClick={async () => await deleteCampus(campus.id)}>Delete</button>}
        </div>
    )
}