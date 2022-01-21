import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function AddStudent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [email, setEmail] = useState("");
    const [gpa, setGpa] = useState(null)
    
    async function addStudent() {
        const add = await axios.post('https://ttp-college-db.herokuapp.com/students', {
            firstName : firstName,
            lastName : lastName,
            imageUrl : imageUrl,
            email : email,
            gpa : gpa
        })
        console.log(add);
    }
    
    let navigate = useNavigate();
    return (
        <form className='add-student-form' 
            onSubmit={async e => {
                    e.preventDefault();
                    const message = await addStudent();
                    console.log(message);
                    navigate('/students');
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