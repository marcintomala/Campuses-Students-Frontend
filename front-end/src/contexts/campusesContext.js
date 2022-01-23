import React, {useEffect, useState } from "react";
import axios from "axios";

export const CampusesContext = React.createContext({
    campuses : {},
    addCampus: (name, imageUrl, address, description) => {},
    editCampus: (campus) => {},
    deleteCampus: (id) => {}
});

export default function Campuses(props) {
    const [ campuses, setCampuses ] = useState("");

    useEffect(() => {
        fetchCampuses();
    }, [])

    async function fetchCampuses() {
        const response = await axios.get('https://ttp-college-db.herokuapp.com/campuses');
        const campuses = {};
        for (let i = 0; i < response.data.length; i++) {
            campuses[response.data[i].id] = response.data[i];
        }
        if (campuses) {
            setCampuses(campuses);
        }
    }

    async function addCampus(name, imageUrl, address, description) {
        const response = await axios.post('https://ttp-college-db.herokuapp.com/campuses', {
            name : name,
            imageUrl : imageUrl,
            address : address,
            description : description
        })
        const newCampus = await response.data.campus;
        setCampuses(prevCampuses => {
            const newCampuses = {...prevCampuses};
            newCampuses[newCampus.id] = newCampus;
            return newCampuses;
        })
        return response;
    }

    async function editCampus(campus) {
        await axios.put('https://ttp-college-db.herokuapp.com/campuses', {
            id : campus.id,
            name : campus.name,
            imageUrl : campus.imageUrl,
            address : campus.address,
            description : campus.description
        })
        setCampuses(prevCampuses => {
            const newCampuses = {...prevCampuses};
            newCampuses[campus.id] = campus;
            return newCampuses;
        })
    }

    async function deleteCampus(id) {
        await axios.delete('https://ttp-college-db.herokuapp.com/campuses/' + id);
        setCampuses(prevCampuses => {
            const newCampuses = {...prevCampuses};
            delete newCampuses[id];
            return newCampuses;
        })
    }

    return (
        <CampusesContext.Provider value={{campuses : campuses, addCampus : addCampus, editCampus: editCampus, deleteCampus : deleteCampus}}>
            {props.children}
        </CampusesContext.Provider>
    )
}