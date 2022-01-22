import React from "react";
import { Link } from 'react-router-dom'
import StudentProfile from "./StudentProfile";

export default function StudentCard(props) {
    const student = props.student;
    <StudentProfile delete = {props.delete} />
    return (
        <div className="student-card">
            <img src={student.imageUrl} alt={`${student.name}`} />
            <Link
                to ={`/students/${student.id}`}
                state={{ student : student, origin : '/students'}} 
            >
                <h1>{student.firstName} {student.lastName}</h1>
            </Link>
            <Link 
                to={`/students/${student.id}/edit`} 
                state={{ student : student, origin : '/students' }} 
                className='nav-link'
            >
                Edit Student
            </Link>
            <button name="delete" value="delete" onClick={async () => await props.delete(student.id)}>Delete</button>
        </div>
    )
}