import React, { useContext } from "react";
import { Link, useLocation } from 'react-router-dom'
import { StudentsContext } from "../contexts/studentsContext";

export default function StudentCard(props) {
    const student = props.student;
    const id = student.id;
    const location = useLocation();
    const origin = location.pathname

    const deleteStudent = useContext(StudentsContext).deleteStudent;
    const cCampus = useContext(StudentsContext).changeCampus;

    return (
        <div className="student-card">
            <img src={student.imageUrl} alt={`${student.name}`} />
            <Link to={`/students/${student.id}`} className='nav-link'><h1>{student.firstName} {student.lastName}</h1></Link>
            {origin === '/students' && <button name="delete" value="delete" onClick={async () => await deleteStudent(student.id)}>Delete</button>}
            {origin.endsWith('/edit') && <button name="delete" value="delete" type="button" 
                onClick={() => {
                    cCampus(student.id, null);
                    props.setStudents(prevStudents => {
                        const newStudents = {...prevStudents};
                        delete newStudents[id];
                        return newStudents;
                })}}>Remove From Campus</button>}
        </div>
    )
}