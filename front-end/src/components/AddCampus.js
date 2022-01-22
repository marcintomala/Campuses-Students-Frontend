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
                Campus Name: <br></br><input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
                Address: <br></br><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <br></br>
            <label>
                Description: <br></br><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br></br>
            <input className="submit-button" type="submit" value="Submit" />
        </form>
    )
}