import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { CampusesContext } from "../contexts/campusesContext";
import ErrorDisplay from "./ErrorDisplay";

export default function AddCampus() {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("")
    let navigate = useNavigate();

    const add = useContext(CampusesContext).addCampus;

    async function addNewCampus() {
        return await add(name, imageUrl, address, description);
    }
    
    let errors;
    let submitDisabled = true; 

    function validate() {
        errors = {};
        if (name === '') {
            errors['name'] = "Name cannot be empty."
        } 
        if (address === '') {
            errors['address'] = "Address must not be empty."
        }
        if (Object.keys(errors).length === 0) {
            submitDisabled = false;
        }
    }

    validate();

    return (
        <form className='add-campus-form' 
            onSubmit={ async e => {
                    e.preventDefault();
                    const newCampus = await addNewCampus();
                    const newCampusId = newCampus.data.campus.id;
                    navigate(`/campuses/${newCampusId}`);
                }
            }>
            <h1>Add New Campus</h1>
            <label>
                Name: <br></br> <input placeholder='Enter Campus Name:' type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Image URL: <br></br> <input placeholder='Enter Campus photo URL:' type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </label>
            <label>
                Address: <br></br> <input placeholder='Enter Campus address:' type="text" value={address} onChange={e => setAddress(e.target.value)} />
            </label>
            <label>
                Description: <br></br> <input placeholder='Describe the campus:' type="textarea" value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <input className="submit" disabled={submitDisabled} type="submit" value="Submit" />
            <ErrorDisplay errors={errors} />
        </form>
    )
}