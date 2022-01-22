import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "axios";
import CampusDropdown from "./CampusDropdown";
import CampusCard from "./CampusCard";

export default function EditStudent() {
    const location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
            navigate('/students');
        }
        if (student.campusId) {
            fetchCampus(student.campusId);
        }
    }, [])

    const { student, origin } = location.state ? location.state : {student : null, origin : null};

    const [firstName, setFirstName] = useState(student ? student.firstName : "");
    const [lastName, setLastName] = useState(student ? student.lastName : "");
    const [imageUrl, setImageUrl] = useState(student ? student.imageUrl : "");
    const [email, setEmail] = useState(student ? student.email : "");
    const [gpa, setGpa] = useState(student ? student.gpa : "");
    const [campusId, setCampusId ] = useState(student ? student.campusId : "");
    const [currentCampus, setCurrentCampus] = useState("");

    async function fetchCampus(id) {
        const response = await axios.get('https://ttp-college-db.herokuapp.com/campuses/' + id);
        const campus = await response.data;
        setCurrentCampus(campus);
    }

    async function editStudent() {
        await axios.put('https://ttp-college-db.herokuapp.com/students', {
            id : student.id,
            firstName : firstName,
            lastName : lastName,
            imageUrl : imageUrl,
            email : email,
            gpa : gpa,
            campusId : campusId
        })
    }

    async function campusSet(id) {
        setCampusId(id);
        await fetchCampus(id);
    }
    
    return (
        <form className='edit-student-form' 
            onSubmit={async e => {
                    e.preventDefault();
                    await editStudent();
                    navigate(origin);
                }
            }>
            <label>
                First Name:<input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
                Last Name:<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>
                Image URL:<input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label>
            <label>
                Email:<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                GPA:<input type="number" value={gpa} onChange={(e) => setGpa(Number(e.target.value))} />
            </label>
            {campusId && <CampusCard className={'edit-student-campus-card'} key={currentCampus.id} campus={currentCampus} />}
            {campusId && <button type="button" onClick={e => { setCampusId(null); setCurrentCampus(""); }}>Remove From Current Campus</button>}
            {!campusId && <CampusDropdown campusSet={campusSet} />}
            <input type="submit" value="Submit" />
            <button type="button" name="Cancel" onClick={() => navigate(origin)}>Cancel</button>
        </form>
    )
}