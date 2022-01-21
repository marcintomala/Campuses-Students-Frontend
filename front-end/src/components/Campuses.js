import axios from "axios";
import React, { useEffect, useState } from "react";
import CampusCard from "./CampusCard";
import { Link } from "react-router-dom";

export default function Campuses() {
    const [campuses, setCampuses] = useState("");

    useEffect(() => {
        fetchCampuses();
    }, [])

    async function deleteCampus(id) {
        await axios.delete('https://ttp-college-db.herokuapp.com/campuses/' + id);
        await fetchCampuses();
    }

    async function fetchCampuses () {
        const campuses = await axios.get('https://ttp-college-db.herokuapp.com/campuses');
        setCampuses(campuses.data.map(campus => <CampusCard key={campus.id} campus={campus} delete={deleteCampus} />));
    }

    return(
        <div className="campuses-view">
            <h1>Here are all the campuses!</h1>
            <div className="campus-cards">
                {campuses}
            </div>
            <Link 
                to={`/campuses/add`} 
                className='nav-link'
            >
                Add Campus
            </Link>
        </div>
    )
}