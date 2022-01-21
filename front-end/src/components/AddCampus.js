import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function AddCampus() {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("")
    
    async function addCampus() {
        await axios.post('https://ttp-college-db.herokuapp.com/campuses', {
            name : name,
            imageUrl : imageUrl,
            address : address,
            description : description
        })
    }
    
    let navigate = useNavigate();
    return (
        <form className='add-campus-form' 
            onSubmit={async e => {
                    e.preventDefault();
                    await addCampus();
                    navigate('/campuses');
                }
            }>
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
        </form>
    )
}