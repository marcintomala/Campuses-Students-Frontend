import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import StudentCard from './StudentCard';

export default function Campus() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [ campus, setCampus ] = useState("");
    const [ students, setStudents ] = useState("");

    useEffect(() => {
        if (!location.state) {
            fetchCampus();
            getStudents();
        } else {
            setCampus(location.state.campus);
            getStudents();
        }
    }, [])

    async function deleteCampus() {
        const response = await axios.delete('https://ttp-college-db.herokuapp.com/campuses/' + campus.id);
        console.log(response);
        navigate('/campuses');
    }

    async function deleteStudentFromCampus (id) {
        const response = await axios.put('https://ttp-college-db.herokuapp.com/students', {
            id : id,
            campusId : null
        });
        console.log(response);
        setStudents(prevStudents => {
            const newStudents = {...prevStudents}
            delete newStudents[id]
            return newStudents;
        })
    }

    async function fetchCampus() {
        const response = await axios.get('https://ttp-college-db.herokuapp.com/campuses/' + params.id);
        const campus = await response.data;
        if (campus) {
            setCampus(campus);
        }
    }

    async function getStudents() {
        const response = await axios.get(`https://ttp-college-db.herokuapp.com/campuses/${params.id}/students`);
        const students = {};
        for (let i = 0; i < response.data.length; i++) {
            students[response.data[i].id] = response.data[i];
        }
        if (students) {
            setStudents(students);
        }
    }

    function link(to, contents) {
        return (<Link to={to} state={{ campus : campus, students : students, origin : `/campuses/${campus.id}` }} 
                    className='button-link'> {contents} </Link>)
    }

    return (
        <div className="campus-view">
            <h1>{campus.name}</h1>
            {link(`/campuses/${campus.id}/edit`, <button type="button">Edit Campus</button>)}
            <button name="delete" value="delete" onClick={ async () => await deleteCampus() }>Delete</button>
            <div className='campus-view-student-cards'>
                {students && Object.keys(students).map(key => <StudentCard className={'campus-view-student-card'} key={students[key].id} student={students[key]} delete={deleteStudentFromCampus} />)}
            </div>
        </div>
    )
}