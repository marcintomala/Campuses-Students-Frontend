import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { StudentsContext } from "../contexts/studentsContext";

export default function AddStudent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [email, setEmail] = useState("");
    const [gpa, setGpa] = useState(0)
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [gpaError, setGpaError] = useState("")
    let navigate = useNavigate();

    const add = useContext(StudentsContext).addStudent;

    function validate(){
        if(firstName === "" || lastName === "")
            setNameError("Student Name CAN NOT be blank")
        else
            setNameError("")

        if(!email.includes("@") || !email.includes(".com"))
            setEmailError("Invalid Email")
        else
            setEmailError("")
        
        if(gpa < 0 || gpa > 4)
            setGpaError("GPA must be a number between 0.0 and 4.0")
        else
            setGpaError("")
    }

    async function addNewStudent() {
        return await add(firstName, lastName, imageUrl, email, gpa);
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
            <h1>Add New Student</h1>
            <label>
                First Name: <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </label><br></br><br></br>
            <label>
                Last Name: <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
            </label><br></br><br></br>
            <label>
                Image URL: <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </label><br></br><br></br>
            <label>
                Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </label><br></br><br></br>
            <label>
                GPA: <input type="number" value={gpa} onChange={e => setGpa(Number(e.target.value))} />
            </label><br></br><br></br>
            <input className = "form-submit" type="submit" value="Submit" onClick={validate}/>
            <div className="validate">
                <p>{nameError}</p>
                <p>{emailError}</p>
                <p>{gpaError}</p>
            </div>
        </form>
    )
}