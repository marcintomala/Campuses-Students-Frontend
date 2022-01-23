import React, { useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { CampusesContext } from "../contexts/campusesContext";
import StudentCard from "./StudentCard";
import StudentDropdown from "./StudentDropdown";
import { StudentsContext } from "../contexts/studentsContext";

export default function EditCampus() {
    const params = useParams();
    const id = Number(params.id);
    let navigate = useNavigate();

    const campus = useContext(CampusesContext).campuses[id];
    const campusStudents = useContext(StudentsContext).getByCampus;
    const edit = useContext(CampusesContext).editCampus;
    
    async function editCampus(campus) {
        await edit(campus);
    }

    function getCampusStudents() {
        return campusStudents(id);
    }


    const [name, setName] = useState(campus.name);
    const [imageUrl, setImageUrl] = useState(campus.imageUrl);
    const [address, setAddress] = useState(campus.address);
    const [description, setDescription] = useState(campus.description);
    const [nameError, setNameError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [students, setStudents] = useState(getCampusStudents());

    function validate(){
        if(name === "")
            setNameError("Campus name CAN NOT be blank")
        else
            setNameError("")

        if(address === "")
            setAddressError("Address CAN NOT be blank")
        else
            setAddressError("")
    }

    return (
        <form className='edit-campus-form' 
            onSubmit={ async e => {
                    e.preventDefault();
                    const campus = {
                        id : id,
                        name : name,
                        imageUrl : imageUrl,
                        address : address,
                        description : description
                    }
                    await editCampus(campus);
                    navigate(`/campuses/${id}`);
                }
            }
        >   
            <h1>Edit {name}</h1>
            <label>
                Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label><br></br><br></br>
            <label>
                Image URL: <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label><br></br><br></br>
            <label>
                Address: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label><br></br><br></br>
            <label className="form-description">
                <textarea type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label><br></br><br></br>
            <input className = "form-submit" type="submit" value="Submit" onClick={validate}/>
            <button type="button" name="Cancel" onClick={() => navigate(`/campus/${id}`)}>Cancel</button>
            <div className="validate">
            <p>{nameError}</p>
            <p>{addressError}</p>
            </div>
            <StudentDropdown setStudents={setStudents} />
            <div className="student-cards">
                {students && Object.keys(students).map(key => <StudentCard className={'edit-campus-student-card'} key={students[key].id} student={students[key]} setStudents={setStudents} />)}
            </div>
        </form>
    )
}