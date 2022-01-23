import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { StudentsContext } from "../contexts/studentsContext";

export default function AddStudent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [email, setEmail] = useState({email: "", valid: false});
    const [gpa, setGpa] = useState(0)
    let navigate = useNavigate();

    const add = useContext(StudentsContext).addStudent;

    async function addNewStudent() {
        return await add(firstName, lastName, imageUrl, email.email, gpa);
    }
    
    function validateEmail(email) {
        console.log(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
        return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }

    return (
        <form className='add-student-form' 
            onSubmit={ async e => {
                    e.preventDefault();
                    const newStudent = await addNewStudent();
                    const newStudentId = newStudent.data.student.id;
                    navigate(`/students/${newStudentId}`);
                }
            }>
            <label>
                First Name:<input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </label>
            <label>
                Last Name:<input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
            </label>
            <label>
                Image URL:<input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </label>
            <label>
                Email:<input type="text" value={email.email} onChange={e => setEmail({email: e.target.value, valid: validateEmail(e.target.value)})} />
            </label>
            <label>
                GPA:<input type="number" value={gpa} onChange={e => setGpa(Number(e.target.value))} />
            </label>
            <input className="submit" type="submit" value="Submit" />
        </form>
    )
}