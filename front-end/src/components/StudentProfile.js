import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

export default function StudentProfile(props){
    const location = useLocation()
    const {student, origin} = location.state
    const navigate = useNavigate()

    async function deleteStudent(id) {
        await axios.delete('https://ttp-college-db.herokuapp.com/students/' + id);
    }
    return(
        <div className = "studentProfile">
            <img src={student.imageUrl} alt={`${student.name}`} />
            <h1>{student.firstName} {student.lastName}</h1>
            <h3>Email : {student.email}</h3>
            <p>GPA : {student.gpa}</p>
            <Link 
                to={`/students/${student.id}/edit`} 
                state={{ student : student, origin : '/students' }} 
                className='nav-link'
            >
                Edit Student
            </Link>
            <button name="delete" value="delete" onClick={async () => {await deleteStudent(student.id); navigate(origin)}}>Delete </button>
        </div>
    )
}