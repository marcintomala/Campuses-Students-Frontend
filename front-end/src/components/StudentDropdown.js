import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function StudentDropdown(props) {
    const students = props.students;
    const allStudents = props.otherStudents;
    const params = useParams();
    return (
        <select onChange={async e => { 
            await props.studentSet(allStudents[Number(e.target.value)], Number(params.id));}}>
            <option key={1} value="none">Add Students...</option>
            {Object.keys(allStudents).length > 0 && Object.keys(allStudents).map(key => <option key={key} value={allStudents[key].id}>{allStudents[key].firstName} {allStudents[key].lastName}</option>)}
        </select>
    )
} 