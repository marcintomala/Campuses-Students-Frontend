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
        setStudents(prevStudents => {
            const newStudents = {...prevStudents};
            delete newStudents[id];
            return newStudents;
        })
    }

    async function fetchStudents() {
        const response = await axios.get('https://ttp-college-db.herokuapp.com/students');
        const students = {};
        for (let i = 0; i < response.data.length; i++) {
            students[response.data[i].id] = response.data[i];
        }
        if (students) {
            setStudents(students);
        }
    }
    //students.data.map(student => <StudentCard key={student.id} student={student} delete={deleteStudent} />)
    return (
        <div className="students-view">
            <h1>Here are all the students!</h1>
            <div className="student-cards">
                {Object.keys(students).map(key => <StudentCard key={students[key].id} student={students[key]} delete={deleteStudent} />)}
            </div>
            <Link 
                to={`/students/add`} 
                className='button-link'
            >
                <button type="button">
                    Add Student
                </button>
            </Link>
        </div>
    )
}