import React, { useContext } from 'react';
import { useParams, useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import CampusCard from './CampusCard';
import { StudentsContext } from '../contexts/studentsContext';
import { CampusesContext } from '../contexts/campusesContext';

export default function Student() {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const id = Number(params.id);
    const edit = location.pathname.endsWith('/edit'); 
    
    const student = useContext(StudentsContext).students[id];    
    const campus = useContext(CampusesContext).campuses[student.campusId]
    const sDelete = useContext(StudentsContext).deleteStudent;

    async function deleteStudent() {
        await sDelete(id);
    }

    let gpa;
    if (student) {
        gpa = student.gpa.toFixed(2)[3] === '0' ? student.gpa.toFixed(1) : student.gpa.toFixed(2);
    }

    return (
        <>
            {!edit && <div className="student-view">
                <img src={student.imageUrl} alt={`${student.firstName}`} />
                <h1>{student.firstName} {student.lastName}</h1>
                <h3>Email : {student.email}</h3>
                <p>GPA : {student && gpa}</p>
                <Link to={`/students/${student.id}/edit`} className='button-link'>
                    <button type="button">
                        Edit Student
                    </button>
                </Link>
                <button name="delete" value="delete" onClick={ async () => {
                    navigate('/students');
                    await deleteStudent();
                }}>Delete</button>
                {!campus && <h1>This student does not have a campus :(</h1>}
                {campus && <CampusCard className={'student-view-campus-card'} key={campus.id} campus={campus} />}
            </div>}
            {edit && <Outlet />}
        </>
        
    )
}