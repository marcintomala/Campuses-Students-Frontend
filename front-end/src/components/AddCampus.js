import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { CampusesContext } from "../contexts/campusesContext";

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
    
    return (
        <form className='add-campus-form' 
            onSubmit={ async e => {
                    e.preventDefault();
                    const newCampus = await addNewCampus();
                    const newCampusId = newCampus.data.campus.id;
                    navigate(`/campuses/${newCampusId}`);
                }
            }>
            <label>
                Name:<input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Image URL:<input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </label>
            <label>
                Address:<input type="text" value={address} onChange={e => setAddress(e.target.value)} />
            </label>
            <label>
                Description:<input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}