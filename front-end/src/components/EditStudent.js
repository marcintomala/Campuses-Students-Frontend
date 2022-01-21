import React, { useState } from "react";
import { useNavigate, useLocation, useHistory } from 'react-router-dom'
import axios from "axios";

export default function EditStudent() {
    const location = useLocation();
    const { student, origin } = location.state;
    const [firstName, setFirstName] = useState(student.firstName);
    const [lastName, setLastName] = useState(student.lastName);
    const [imageUrl, setImageUrl] = useState(student.imageUrl);
    const [email, setEmail] = useState(student.email);
    const [gpa, setGpa] = useState(student.gpa)
    
    async function editStudent() {
        const edit = await axios.put('https://ttp-college-db.herokuapp.com/students', {
            id : student.id,
            firstName : firstName,
            lastName : lastName,
            imageUrl : imageUrl,
            email : email,
            gpa : gpa
        })
        console.log(edit);
    }
    
    let navigate = useNavigate();
    return (
        <form className='edit-student-form' 
            onSubmit={async e => {
                    e.preventDefault();
                    const message = await editStudent();
                    console.log(message);
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
            <input type="submit" value="Submit" />
        </form>
    )
}