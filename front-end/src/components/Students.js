import axios from "axios";
import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { Link } from "react-router-dom";

export default function Students() {
    const [students, setStudents] = useState("");

    useEffect(() => {
        fetchStudents();
    }, [])

    async function deleteStudent(id) {
        await axios.delete('https://ttp-college-db.herokuapp.com/students/' + id);
        fetchStudents();
    }

    async function fetchStudents () {
        await axios.get('https://ttp-college-db.herokuapp.com/students');
        setStudents(students.data.map(student => <StudentCard key={student.id} student={student} delete={deleteStudent} />));
    }


    return(
        <div className="students-view">
            <h1>Here are all the students!</h1>
            <div className="campus-cards">
                {students}
            </div>
            <Link 
                to={`/students/add`} 
                className='nav-link'
            >
                Add Student
            </Link>
        </div>
    )
}