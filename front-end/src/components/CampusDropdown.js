import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDropdown(props) {
    const [ campuses, setCampuses ] = useState("");

    useEffect(() => {
        const fetch = async () => {
            fetchCampuses();
        }
        fetch();
    }, [])
    

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

    return (
        <select onChange={async e => { await props.campusSet(Number(e.target.value)); } }>
            <option key={1} value="none">Select an Option</option>
            {Object.keys(campuses).map(key => <option key={key} value={campuses[key].id} >{campuses[key].name}</option>)}
        </select>
    )
} 

