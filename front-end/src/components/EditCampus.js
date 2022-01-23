import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { CampusesContext } from "../contexts/campusesContext";
import StudentCard from "./StudentCard";
import StudentDropdown from "./StudentDropdown";
import { StudentsContext } from "../contexts/studentsContext";

export default function EditCampus() {
    const params = useParams();
    const id = Number(params.id);
    let navigate = useNavigate();
    const placeholderCampus = useContext(CampusesContext)?.campuses[-1];
    const campusesContext = useContext(CampusesContext)?.campuses[id];
    
    const campus = campusesContext ? campusesContext : placeholderCampus; 
    const campusStudents = useContext(StudentsContext).getByCampus;
    const edit = useContext(CampusesContext).editCampus;

    useEffect(() => {
        if(campus.id === -1) {
            navigate(`/campuses/${id}`);
        }
    }, [])
    
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
            Name: 
            <input className='edit-campus-input' type="text" value={name} onChange={(e) => setName(e.target.value)} />
            Image URL:
            <input className='edit-campus-input' type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            Address: 
            <input className='edit-campus-input' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            Description: 
            <input className='edit-campus-input' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input className="submit" type="submit" value="Submit" />
            <button type="button" name="Cancel" onClick={() => navigate(`/campus/${id}`)}>Cancel</button>
            <StudentDropdown className='student-dropdown' setStudents={setStudents} />
            <div className="student-cards">
                {students && Object.keys(students).map(key => <StudentCard className={'edit-campus-student-card'} key={students[key].id} student={students[key]} setStudents={setStudents} />)}
            </div>
        </form>
    )
}