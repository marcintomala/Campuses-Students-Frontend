import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { CampusesContext } from "../contexts/campusesContext";
import ErrorDisplay from "./ErrorDisplay";

/* This component is responsible for rendering the 'Add Campus' form. The logic included goes as follows:
- The values of the input fields are stored in the state (default = "").
- As the user enters data, the state is updated and validated.
- If invalid data is entered, the submitDisabled pseudo-state blocks the submit button from being clicked.
- Error messages provided by ErrorDisplay are also displayed under the submit button to inform the user of the problem.

On submit, two important things happen:
1. The component gathers the entered data and, using a function from campuses context, sents a put request to the API.
2. The function also places the created campus in the campuses context's campuses object - i.e. locally built and maintained
    global state. This is done to minimize fetch calls until they are absolutely necessary.
*/

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
            errors['name'] = "Name must not be empty."
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
                Name: <br></br> <input className="form-input" placeholder='Enter Campus Name:' type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Image URL: <br></br> <input className="form-input" placeholder='Enter Campus photo URL:' type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </label>
            <label>
                Address: <br></br> <input className="form-input" placeholder='Enter Campus address:' type="text" value={address} onChange={e => setAddress(e.target.value)} />
            </label>
            <label>
                Description: <br></br> <input  className="form-input" placeholder='Describe the campus:' value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <input className="submit" disabled={submitDisabled} type="submit" value="Submit" />
            <ErrorDisplay errors={errors} />
        </form>
    )
}