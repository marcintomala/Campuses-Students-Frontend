import React, {  useContext } from "react";
import CampusCard from "./CampusCard";
import { Link } from "react-router-dom";
import { CampusesContext } from "../contexts/campusesContext";

export default function Campuses() {
    const campuses = useContext(CampusesContext).campuses;
    const loading = campuses[-1];

    return(
        <>
            {!loading && <div className="campuses-view">
                {Object.keys(campuses).length === 0 && <h1>There are currently no campuses in the database :(</h1>}
                {Object.keys(campuses).length > 0 && <h1>Here are all the campuses!</h1>}
                <Link to={`/campuses/add`} className='button-link'><button type="button">Add Campus</button></Link>
                <div className="campuses-view-campus-cards">
                    {Object.keys(campuses).length > 0 && Object.keys(campuses).map(key => <CampusCard className={'campuses-view-campus-card'} key={campuses[key].id} campus={campuses[key]} />)}
                </div>
            </div>}
        </>
    )
}