import React, {  useContext } from "react";
import CampusCard from "./CampusCard";
import { Link, useLocation, Outlet } from "react-router-dom";
import { CampusesContext } from "../contexts/campusesContext";

export default function Campuses() {
    const campuses = useContext(CampusesContext).campuses;
    const location = useLocation();
    const campusesView = location.pathname === '/campuses';

    return(
        <>
            {campusesView && <div className="campuses-view">
                {Object.keys(campuses).length > 0 && <h1>Here are all the campuses!</h1>}
                <Link to={`/campuses/add`} className='button-link'>
                    <button type="button">
                        Add Campus
                    </button>
                </Link>
                <div className="campuses-view-campus-cards">
                    {Object.keys(campuses).length > 0 && Object.keys(campuses).map(key => <CampusCard className={'campuses-view-campus-card'} key={campuses[key].id} campus={campuses[key]} />)}
                </div>
            </div>}
            {!campusesView && <Outlet />}
        </>
    )
}