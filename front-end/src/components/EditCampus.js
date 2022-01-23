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
    const [students, setStudents] = useState(getCampusStudents());

    
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
            <label>
                Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Image URL: <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label>
            <label>
                Address: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
                Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
            <button type="button" name="Cancel" onClick={() => navigate(`/campus/${id}`)}>Cancel</button>
            <StudentDropdown setStudents={setStudents} />
            {students && Object.keys(students).map(key => <StudentCard className={'edit-campus-student-card'} key={students[key].id} student={students[key]} setStudents={setStudents} />)}
        </form>
    )
}