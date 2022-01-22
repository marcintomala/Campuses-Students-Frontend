import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "axios";

export default function EditCampus() {
    const location = useLocation();
    const { campus, origin } = location.state;
    const [name, setName] = useState(campus.name);
    const [imageUrl, setImageUrl] = useState(campus.imageUrl);
    const [address, setAddress] = useState(campus.address);
    const [description, setDescription] = useState(campus.description)
    
    async function addCampus() {
        await axios.put('https://ttp-college-db.herokuapp.com/campuses', {
            id : campus.id,
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
                    navigate(origin);
                }
            }>
            <label>
                Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Image URL (*.png,*.jpg,*.gif):
                <input 
                    type="URL"
                    pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.gif)"   
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                />
            </label>
            <label>
                Address: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
                Description: <input type="text" value={description} onChange={(e) => setDescription(Number(e.target.value))} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}