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
        setCampuses(prevCampuses => {
            const newCampuses = {...prevCampuses};
            delete newCampuses[id];
            return newCampuses;
        })
    }

    async function fetchCampuses() {
        const response = await axios.get('https://ttp-college-db.herokuapp.com/campuses');
        const campuses = {};
        for (let i = 0; i < response.data.length; i++) {
            campuses[response.data[i].id] = response.data[i];
        }
        if (campuses) {
            setCampuses(campuses);
        }
    }

    return(
        <div className="campuses-view">
            <h1>Here are all the campuses!</h1>
            <div className="campus-cards">
                {Object.keys(campuses).map(key => <CampusCard key={campuses[key].id} campus={campuses[key]} delete={deleteCampus} />)}
            </div>
            <Link 
                to={`/campuses/add`} 
                className='button-link'
            >
                <button type="button">
                    Add Campus
                </button>
            </Link>
        </div>
    )
}