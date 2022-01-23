import React, { useContext } from 'react';
import {  useParams, useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import StudentCard from './StudentCard';
import { CampusesContext } from '../contexts/campusesContext';
import { StudentsContext } from '../contexts/studentsContext';

export default function Campus() {
    const params = useParams();
    const navigate = useNavigate();
    const id = Number(params.id);
    const location = useLocation();
    const edit = location.pathname.endsWith('/edit'); 


    const placeholderImage = 'https://commonlook.com/wp-content/uploads/2019/05/placeholder.jpg'
    const campus = useContext(CampusesContext).campuses[id];
    const dCampus = useContext(CampusesContext).deleteCampus;
    const cStudents = useContext(StudentsContext).getByCampus;
    const campusStudents = getStudents();

    function deleteCampus() {
        dCampus(id);
    }
    
    function getStudents() {
        return cStudents(id);
    }
    
    function link(to, contents) {
        return (<Link to={to} className='button-link'> {contents} </Link>)
    }

    return (
        <>
            {!edit && 
            <div className="campus-view">
                <h1>{campus.name}</h1>
                <img src={campus.imageUrl ? campus.imageUrl : placeholderImage} alt={`${campus.name}`} />
                <h3>{campus.address}</h3>
                <p>{campus.description}</p>
                {link(`/campuses/${campus.id}/edit`, <button type="button">Edit Campus</button>)}
                <button name="delete" value="delete" onClick={() => {
                    navigate('/campuses'); 
                    deleteCampus();
                }}>Delete</button>
                <div className='campus-view-student-cards'>
                    {!campusStudents && <h1>No students are associated with this campus.</h1>}
                    {campusStudents && <h1>Students associated with this campus:</h1>}
                    {campusStudents && Object.keys(campusStudents).map(key => <StudentCard className={'campus-view-student-card'} key={campusStudents[key].id} student={campusStudents[key]} />)}
                </div>
            </div>}
            {edit && <Outlet />}
        </>
    )
}