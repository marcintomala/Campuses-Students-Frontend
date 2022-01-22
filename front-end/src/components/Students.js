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
        await fetchStudents();
    }

    async function fetchStudents () {
        const students = await axios.get('https://ttp-college-db.herokuapp.com/students');
        if(students) {
            setStudents(students.data.map(student => <StudentCard key={student.id} student={student} delete={deleteStudent} />));
        }
    }

    if (students.length === 0) {
        return (
            <div className="no-students-view">
            <h1>All Students</h1>
            <p>There are no students registered in the database.</p>
            <Link 
                to={`/students/add`} 
                className='add-link'
            >
                <button>Add Student</button>
            </Link>
        </div>
        )
    }

    return(
        <div className="students-view">
            <h1>All Students</h1>
            <div className="campus-cards">
                {students}
            </div>
            <Link 
                to={`/students/add`} 
                className='add-link'
            >
                <button>Add Student</button>
            </Link>
        </div>
    )
}