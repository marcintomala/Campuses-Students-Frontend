import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import StudentCard from "./StudentCard";
import StudentDropdown from "./StudentDropdown";
import axios from "axios";

export default function EditCampus() {
    const location = useLocation();
    const params = useParams();
    
    useEffect(() => {
        if (!location.state) {
            navigate('/campuses');
        }
        fetchOtherStudents();
    }, [])
    
    const { campus, origin } = location.state ? location.state : {campus : null, origin : null};
    
    const [name, setName] = useState(campus ? campus.name : "");
    const [imageUrl, setImageUrl] = useState(campus ? campus.imageUrl : "");
    const [address, setAddress] = useState(campus ? campus.address : "");
    const [description, setDescription] = useState(campus ? campus.description : "");
    const [students, setStudents ] = useState(campus ? location.state.students : "");
    const [otherStudents, setOtherStudents] = useState("");

    async function editCampus() {
        await axios.put('https://ttp-college-db.herokuapp.com/campuses', {
            id : campus.id,
            name : name,
            imageUrl : imageUrl,
            address : address,
            description : description
        })
    }
    
    async function fetchOtherStudents() {
        const response = await axios.get('https://ttp-college-db.herokuapp.com/students');
        const students = {};
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].campusId !== Number(params.id)){
                students[response.data[i].id] = response.data[i];
            }
        }
        if (students) {
            setOtherStudents(students);
        }
        console.log(otherStudents);
        console.log(origin)
    }

    async function studentSet(student, campusId) {
        const response = await axios.put('https://ttp-college-db.herokuapp.com/students', {
            id : student.id,
            campusId : campusId
        });
        console.log(response);
        setStudents(prevStudents => {
            const newStudents = {...prevStudents};
            newStudents[student.id] = student;
            return newStudents; 
        });
        setOtherStudents(prevStudents => {
            const newStudents = {...prevStudents}
            delete newStudents[student.id]
            return newStudents;
        });
    }
    
    async function deleteStudentFromCampus(student) {
        const response = await axios.put('https://ttp-college-db.herokuapp.com/students', {
            id : student.id,
            campusId : null
        });
        console.log(response);
        setStudents(prevStudents => {
            const newStudents = {...prevStudents}
            delete newStudents[student.id]
            return newStudents;
        });
        setOtherStudents(prevStudents => {
            const newStudents = {...prevStudents}
            newStudents[student.id] = student;
            return newStudents;
        });
    }
    
    let navigate = useNavigate();
    return (
        <form className='edit-campus-form' 
            onSubmit={ async e => {
                    e.preventDefault();
                    await editCampus();
                    navigate(origin);
                }
            }
        >
            <label>
                Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Image URL: <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label>
            <label>
                Address: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
                Description: <input type="text" value={description} onChange={(e) => setDescription(Number(e.target.value))} />
            </label>
            <input type="submit" value="Submit" />
            <button type="button" name="Cancel" onClick={() => navigate(origin)}>Cancel</button>
            <StudentDropdown otherStudents={otherStudents} students={students} studentSet={studentSet} />
            {students && Object.keys(students).map(key => <StudentCard key={students[key].id} student={students[key]} delete={deleteStudentFromCampus} />)}
        </form>
    )
}