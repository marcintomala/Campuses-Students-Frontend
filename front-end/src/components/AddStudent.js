import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function AddStudent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUrl, setImageUrl] = useState(undefined);
    const [email, setEmail] = useState("");
    const [gpa, setGpa] = useState(0)
    
    async function addStudent() {
        if(!imageUrl) {
            setImageUrl(undefined);
        }
        await axios.post('https://ttp-college-db.herokuapp.com/students', {
            firstName : firstName,
            lastName : lastName,
            imageUrl : imageUrl,
            email : email,
            gpa : gpa
        })
    }
    
    let navigate = useNavigate();
    return (
        <form className='add-student-form' 
            onSubmit={async e => {
                    e.preventDefault();
                    await addStudent();
                    navigate('/students');
                }
            }>
            <label>
                First Name: <br></br><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <br></br>
            <label>
                Last Name: <br></br><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <br></br>
            <label>
                Image URL (*.png,*.jpg,*.gif):
                <br></br>
                <input 
                    type="URL" 
                    pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.gif)" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                />
            </label>
            <br></br>
            <label>
                Email: <br></br><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br></br>
            <label>
                GPA: <br></br><input type="number" min="0" max="4" step="0.1" value={gpa} onChange={(e) => setGpa(Number(e.target.value))} />
            </label>
            <br></br>
            <input className = "submit-button" type="submit" value="Submit" />
        </form>
    )
}