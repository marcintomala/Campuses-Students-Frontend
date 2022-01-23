import React, { useState, useContext } from "react";
import { StudentsContext } from "../contexts/studentsContext";
import { CampusesContext } from "../contexts/campusesContext";
import { useParams, useNavigate } from "react-router";
import CampusCard from "./CampusCard";
import CampusDropdown from "./CampusDropdown"

export default function EditStudent() {
    const params = useParams();
    const id = Number(params.id);
    const navigate = useNavigate();

    const student = useContext(StudentsContext).students[id];
    const edit = useContext(StudentsContext).editStudent;
    
    async function editStudent(student) {
        await edit(student);
    }
    
    const [firstName, setFirstName] = useState(student.firstName);
    const [lastName, setLastName] = useState(student.lastName);
    const [imageUrl, setImageUrl] = useState(student.imageUrl);
    const [email, setEmail] = useState(student.email);
    const [gpa, setGpa] = useState(student.gpa);
    const [campusId, setCampusId ] = useState(student.campusId);
    const campus = useContext(CampusesContext).campuses[campusId];

    return (
        <form className='edit-student-form' 
            onSubmit={async e => {
                    e.preventDefault();
                    const student = {
                        id : id,
                        firstName : firstName,
                        lastName : lastName,
                        imageUrl : imageUrl,
                        email : email,
                        gpa : gpa,
                        campusId : campusId
                    }
                    await editStudent(student);
                    navigate(`/students/${id}`);
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
            {campusId && <CampusCard className={'edit-student-campus-card'} key={campusId} campus={campus} />}
            {campusId && <button type="button" onClick={e => { setCampusId(null); }}>Remove From Current Campus</button>}
            {!campusId && <CampusDropdown setCampusId={setCampusId} />}
            <input type="submit" value="Submit" />
            <button type="button" name="Cancel" onClick={() => navigate(`/students/${id}`)}>Cancel</button>
        </form>
    )
}