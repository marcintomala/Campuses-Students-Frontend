import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { CampusesContext } from "../contexts/campusesContext";

export default function AddCampus() {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("")
    const [nameError, setNameError] = useState("")
    const [addressError, setAddressError] = useState("")
    let navigate = useNavigate();

    const add = useContext(CampusesContext).addCampus;

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
            <h1>Add New Campus</h1>
            <label>
                Name: <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label><br></br><br></br>
            <label>
                Image URL: <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </label><br></br><br></br>
            <label>
                Address: <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
            </label><br></br><br></br>
            <label className="form-description">
                <textarea type="text" placeholder="description" value={description} onChange={e => setDescription(e.target.value)} />
            </label><br></br><br></br>
            <input className = "form-submit"type="submit" value="Submit" onClick={validate}/>
            <div className="validate">
            <p>{nameError}</p>
            <p>{addressError}</p>
            </div>
        </form>
    )
}