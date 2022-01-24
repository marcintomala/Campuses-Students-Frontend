import React, { useContext } from "react";
import { CampusesContext } from "../contexts/campusesContext";

/* Unintuitively perhaps, this is a dropdown menu for the STUDENT edit page. It contains all of the campuses in the database
(or in the context, rather) and this particular dropdown disappears when a campus is selected from it. */

export default function StudentDropdown(props) {
    const campuses = useContext(CampusesContext).campuses;

    return (
        <select  className='dropdown' onChange={async e => { await props.setCampusId(Number(e.target.value)); } }>
            <option key={1} value="none">Add to Campus...</option>
            {Object.keys(campuses).map(key => <option key={key} value={campuses[key].id} >{campuses[key].name}</option>)}
        </select>
    )
} 

