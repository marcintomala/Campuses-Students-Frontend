import React, { useContext } from "react";
import { Link, useLocation } from 'react-router-dom'
import { StudentsContext } from "../contexts/studentsContext";

export default function StudentCard(props) {
    const student = props.student;
    const id = student.id;
    const location = useLocation();
    const path = location.pathname;
    const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    
    let cardClass = path.startsWith('/students') ? 'student-card' : 'campus-students-card';

    const deleteStudent = useContext(StudentsContext).deleteStudent;
    const cCampus = useContext(StudentsContext).changeCampus;

    return (
        <div className={cardClass}>
            <img src={student.imageUrl ? student.imageUrl : placeholderImage} alt={`${student.name}`} />
            <Link to={`/students/${student.id}`} className='nav-link'><h2>{student.firstName} {student.lastName}</h2></Link>
            {path === '/students' && <button name="delete" value="delete" onClick={async () => await deleteStudent(student.id)}>Delete</button>}
            {path.endsWith('/edit') && <button name="delete" value="delete" type="button" 
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