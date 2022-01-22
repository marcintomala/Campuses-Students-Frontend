import React from "react"
import axios from "axios"
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function CampusProfile(){
    const location = useLocation()
    const {campus, origin} = location.state
    const navigate = useNavigate()

    async function deleteCampus(id) {
        await axios.delete('https://ttp-college-db.herokuapp.com/campuses/' + id);
    }
    return(
        <div className = "campusProfile">
            <img src={campus.imageUrl} alt={`${campus.name}`} />
            <h1>{campus.name}</h1>
            <h3>{campus.address}</h3>
            <p>{campus.description}</p>
            <Link 
                to={`/campuses/${campus.id}/edit`} 
                state={{ campus : campus, origin : '/campuses' }} 
                className='nav-link'
            >
                Edit Campus
            </Link>

            <button name="delete" value="delete" onClick={async () => {await deleteCampus(campus.id); navigate(origin)}}>Delete </button>
        </div>
    )
}