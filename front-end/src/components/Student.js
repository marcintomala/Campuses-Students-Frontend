import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import CampusCard from './CampusCard';

export default function Student() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [ student, setStudent ] = useState("");
    const [ campus, setCampus ] = useState("");

    useEffect(() => {
        if (!location.state) {
            fetchStudent();
        } else {
            setStudent(location.state.student);
            fetchCampus(location.state.student.campusId);
        }
    }, [])

    async function deleteStudent() {
        await axios.delete('https://ttp-college-db.herokuapp.com/students/' + student.id);
        navigate('/students');
    }

    async function fetchStudent() {
        const response = await axios.get('https://ttp-college-db.herokuapp.com/students/' + params.id);
        const student = await response.data;
        if (student) {
            setStudent(student);
        }
        if (student.campusId) {
            await fetchCampus(student.campusId);
        }
        console.log(student);
    }

    async function fetchCampus(id) {
        if (id) {
            const campResponse = await axios.get('https://ttp-college-db.herokuapp.com/campuses/' + id);
            const campus = await campResponse.data;
            if (campus) {
                setCampus(campus);
            }
        }
    }

    let gpa;
    if (student) {
        gpa = student.gpa.toFixed(2)[3] === '0' ? student.gpa.toFixed(1) : student.gpa.toFixed(2);
    }

    return (
        <div className="student-view">
            <img src={student.imageUrl} alt={`${student.firstName}`} />
            <h1>{student.firstName} {student.lastName}</h1>
            <h3>Email : {student.email}</h3>
            <p>GPA : {student && gpa}</p>
            <Link 
                to={`/students/${student.id}/edit`} 
                state={{ student : student, origin : `/students/${student.id}` }} 
                className='button-link'
            >
                <button type="button">
                    Edit Student
                </button>
            </Link>
            <button name="delete" value="delete" onClick={ async () => await deleteStudent() }>Delete</button>
            {campus && <CampusCard key={campus.id} campus={campus} />}
        </div>
    )
}