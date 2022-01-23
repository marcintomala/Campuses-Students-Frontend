import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { StudentsContext } from "../contexts/studentsContext";
import ErrorDisplay from "./ErrorDisplay";

export default function AddStudent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [email, setEmail] = useState("");
    const [gpa, setGpa] = useState(0)
    let navigate = useNavigate();

    const add = useContext(StudentsContext).addStudent;

    async function addNewStudent() {
        return await add(firstName, lastName, imageUrl, email, gpa);
    }

    let errors;
    let submitDisabled = true;

    function validate() {
        errors = {};
        const isEmailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); 
        if (firstName === '') {
            errors['firstName'] = "First Name must not be empty."
        } 
        if (lastName === '') {
            errors['lastName'] = "Last Name must not be empty."
        } 
        if (email === '') {
            errors['email'] = "Email must not be empty."
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
    validate();

    return (
        <form className='add-student-form' 
            onSubmit={ async e => {
                    e.preventDefault();
                    const newStudent = await addNewStudent();
                    const newStudentId = newStudent.data.student.id;
                    navigate(`/students/${newStudentId}`);
                }
            }>
            <h1>Add New Student</h1>    
            <label>
                First Name: <br></br> <input className="form-input" placeholder='Enter First Name:' type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </label>
            <label>
                Last Name: <br></br> <input className="form-input" placeholder='Enter Last Name:' type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
            </label>
            <label>
                Image URL: <br></br> <input className="form-input" placeholder='Enter Student photo URL:' type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </label>
            <label>
                Email: <br></br> <input className="form-input" placeholder='Enter Student Email:' type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                GPA: <br></br> <input className="form-input" placeholder='Enter Student GPA:' step={0.1} type="number" onChange={e => setGpa(Number(e.target.value))} />
            </label>
            <input className="submit" disabled={submitDisabled} type="submit" value="Submit" />
            <ErrorDisplay errors={errors} />
        </form>
    )
}