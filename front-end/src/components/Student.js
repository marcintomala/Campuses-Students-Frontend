import React, { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CampusCard from './CampusCard';
import { StudentsContext } from '../contexts/studentsContext';
import { CampusesContext } from '../contexts/campusesContext';

/* Similar to Campus, including the hacky logic. */

export default function Student() {
    const params = useParams();
    const navigate = useNavigate();
    const id = Number(params.id);
    const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    const placeholderStudent = useContext(StudentsContext)?.students[-1];
    const studentsContext = useContext(StudentsContext)?.students[id];
    
    const student = studentsContext ? studentsContext : placeholderStudent;    
    const campus = useContext(CampusesContext).campuses[student.campusId];
    const sDelete = useContext(StudentsContext).deleteStudent;
    const loading = student.id === -1;

    async function deleteStudent() {
        await sDelete(id);
    }

    let gpa;
    if (student) {
        gpa = student.gpa.toFixed(2)[3] === '0' ? student.gpa.toFixed(1) : student.gpa.toFixed(2);
    }

    return (
        <>
            {!loading && 
            <div className="student-view">
                <div className='student-view-left'>
                    <img src={student.imageUrl ? student.imageUrl : placeholderImage} alt={`${student.firstName}`} />
                    <div className='student-buttons'>
                        <Link to={`/students/${student.id}/edit`} className='button-link'><button type="button">Edit Student</button></Link>
                        <button name="delete" value="delete" onClick={ async () => {
                            navigate('/students');
                            await deleteStudent();
                        }}>Delete Student</button>
                        <Link to={`/students`} className='button-link'><button type="button">Return to Students</button></Link>
                    </div>
                </div>
                <div className='student-info'>
                    <h1>{student.firstName} {student.lastName}</h1>
                    <h3>Email : {student.email}</h3>
                    <p>GPA : {student && gpa}</p>
                </div>
                {!campus && <h1 className='student-campus'>This student does not have a campus :(</h1>}
                {campus && 
                <div className='student-campus'>
                    <h3>{student.firstName}'s current campus:</h3>
                    <CampusCard className={'student-view-campus-card'} key={campus.id} campus={campus} />
                </div>}
            </div>}
        </>
        
    )
}