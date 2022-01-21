import React from "react";
import { Link } from 'react-router-dom'

export default function StudentCard(props) {
    const student = props.student;
    return (
        <div className="student-card">
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
            <button name="delete" value="delete" onClick={async () => await props.delete(student.id)}>Delete</button>
        </div>
    )
}