import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { CampusesContext } from "../contexts/campusesContext";
import StudentCard from "./StudentCard";
import StudentDropdown from "./StudentDropdown";
import { StudentsContext } from "../contexts/studentsContext";
import ErrorDisplay from "./ErrorDisplay";

/* Hacky logic (see Campus.js) is present in this component as well, but only to load *something* before redirecting away. 
After all, how can a user know to edit an entry if they haven't yet seen it? 😉 

Similarly to the AddCampus/AddStudent forms, there is also form validation here, but with a twist! 
1. The fields start off populated with the information that we're trying to edit. 
2. The submit button is greyed out until something changed - we don't need fake edits, after all.
3. The students enrolled part of this was the biggest pain. Some more hacky logic was required to maintain
the initial list of students. 

Just like in Add menus, things are also pushed to the app's state besides the database for more performant behaviour 
(and fewer calls to the API). I assume things will break when two people try to edit the same campus simultaneously 
and that's something to ponder in the future. */ 


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
    const [students, setStudents] = useState({students: getCampusStudents(), initial: getCampusStudents()});
    const sameStudents = compareStudents();

    function compareStudents() {
        const studentArray = Object.keys(students.students);
        const initialStudents = Object.keys(students.initial);
        if (studentArray.length !== initialStudents.length) {
            return false;
        } else {
            for (let i = 0; i < initialStudents.length; i++) {
                if(initialStudents[i] !== studentArray[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    // ????????????????????????????????
    const formNotDirty = ( 
        name === campus.name ?
        imageUrl === campus.imageUrl ? 
        address === campus.address ?
        description === campus.description ? 
        sameStudents : false : false : false : false
    )
    

    let errors = {};
    let submitDisabled = true;

    function validate() {
        errors = {};
        if (name === '') {
            errors['name'] = "Name must not be empty."
        } 
        if (address === '') {
            errors['address'] = "Address must not be empty."
        }
        if (Object.keys(errors).length === 0) {
            submitDisabled = false;
        }
    }

    if(!formNotDirty) {
        validate();
    } else {
        errors['noChange'] = "Nothing in the form changed - nothing to save."
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
            <h1>Edit {campus.name}</h1>
            <label>
                Name: <br></br> <input className="form-input" name='name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Image URL: <br></br> <input className="form-input" name='imageurl' type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label>
            <label>
                Address: <br></br> <input className="form-input" name='address' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
                Description: <br></br> <input className="form-input" name='description' type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <input className="submit" disabled={submitDisabled} type="submit" value="Submit" />
            <button type="button" name="Cancel" onClick={() => navigate(`/campuses/${id}`)}>Cancel</button>
            <StudentDropdown className='student-dropdown' setStudents={setStudents} />
            <ErrorDisplay errors={errors} />
            <div className="student-cards">
                {students.students && Object.keys(students.students).map(key => <StudentCard className={'edit-campus-student-card'} key={students.students[key].id} student={students.students[key]} setStudents={setStudents} />)}
            </div>
        </form>
    )
}