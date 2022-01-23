import React, { useState, useContext, useEffect } from "react";
import { StudentsContext } from "../contexts/studentsContext";
import { CampusesContext } from "../contexts/campusesContext";
import { useParams, useNavigate } from "react-router";
import CampusCard from "./CampusCard";
import CampusDropdown from "./CampusDropdown";
import ErrorDisplay from "./ErrorDisplay";

export default function EditStudent() {
    const params = useParams();
    const id = Number(params.id);
    const navigate = useNavigate();
    const placeholderStudent = useContext(StudentsContext)?.students[-1];
    const studentsContext = useContext(StudentsContext)?.students[id];
    
    const student = studentsContext ? studentsContext : placeholderStudent; 
    const edit = useContext(StudentsContext).editStudent;

    useEffect(() => {
        if(student.id === -1) {
            navigate(`/students/${id}`)
        }
    }, []);
    
    async function editStudent(student) {
        await edit(student);
    }
    
    const [firstName, setFirstName] = useState(student.firstName);
    const [lastName, setLastName] = useState(student.lastName);
    const [imageUrl, setImageUrl] = useState(student.imageUrl);
    const [email, setEmail] = useState(student.email);
    const [gpa, setGpa] = useState(student.gpa);
    const [campusId, setCampusId] = useState(student.campusId);
    const campus = useContext(CampusesContext).campuses[campusId];

    const formNotDirty = (
        firstName === student.firstName ?
        lastName === student.lastName ? 
        imageUrl === student.imageUrl ? 
        email === student.email ?
        gpa === student.gpa ?
        campusId === student.campusId : 
        false : false : false : false : false
    )
    let errors = {};
    let submitDisabled = true;

    function validate() {
        const isEmailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); 
        if (firstName === '') {
            errors['firstName'] = "First Name cannot be empty."
        } 
        if (lastName === '') {
            errors['lastName'] = "Last Name cannot be empty."
        } 
        if (email === '') {
            errors['email'] = "Email cannot be empty."
        } else if (!isEmailValid) {
            errors['email'] = "Email is not in a valid format."
        } 
        if (gpa < 0 || gpa > 4 || !gpa) {
            errors['gpa'] = "Gpa must be a numeric value between 0 and 4."
        } 
        if (Object.keys(errors).length === 0) {
            submitDisabled = false;
        }
    }

    if(!formNotDirty) {
        validate();
    } else {
        errors['no change'] = "Nothing in the form changed - nothing to save."
    }

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
            <h1>Edit {student.firstName} {student.lastName} </h1>
            <label>
                First Name: <br></br> <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
                Last Name: <br></br> <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>
                Image URL: <br></br><input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label>
            <label>
                Email: <br></br> <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                GPA: <br></br> <input type="number" step={0.1} value={gpa} onChange={(e) => setGpa(Number(e.target.value))} />
            </label>
            {campusId && <CampusCard className={'edit-student-campus-card'} key={campusId} campus={campus} />}
            {!campusId && <CampusDropdown setCampusId={setCampusId} />}
            {campusId && <button type="button" onClick={e => { setCampusId(null); }}>Remove From Current Campus</button>}
            <input className="submit" type="submit" value="Submit" disabled={submitDisabled} />
            <button type="button" name="Cancel" onClick={() => navigate(`/students/${id}`)}>Cancel</button>
            <ErrorDisplay errors={errors} />
        </form>
    )
}