import React from "react";
import { Link, useLocation } from 'react-router-dom'

export default function StudentCard(props) {
    const student = props.student;
    const location = useLocation();
    const origin = location.pathname

    function link(to, contents) {
        return (<Link to={to} state={{ student : student, origin : origin }} 
                    className='nav-link'> {contents} </Link>)
    }

    return (
        <div className="student-card">
            <img src={student.imageUrl} alt={`${student.name}`} />
            {link(`/students/${student.id}`, <h1>{student.firstName} {student.lastName}</h1>)}
            {origin === '/students' && <button name="delete" value="delete" onClick={async () => await props.delete(student.id)}>Delete</button>}
            {origin.endsWith('/edit') && <button name="delete" value="delete" type="button" onClick={async () => await props.delete(student)}>Remove From Campus</button>}
        </div>
    )
}