import React, { useContext } from "react";
import { useParams } from "react-router";
import { StudentsContext } from "../contexts/studentsContext";

export default function StudentDropdown(props) {
    const params = useParams();
    const id = Number(params.id);
    const gStudents = useContext(StudentsContext).getByCampus;
    const cCampus = useContext(StudentsContext).changeCampus;
    const otherStudents = getOtherStudents();

    function getOtherStudents() {
        return gStudents(id, true);
    }

    return (
        <select className='dropdown' onChange={async e => {
            const studId = Number(e.target.value);
            await cCampus(studId, id);
            await props.setStudents(prevStudents => {
                const newStudents = {...prevStudents};
                newStudents.students[studId] = otherStudents[studId];
                return newStudents;
            })}}>
            <option key={1} value="none">Add Students...</option>
            {Object.keys(otherStudents).length > 0 && Object.keys(otherStudents).map(key => <option key={key} value={otherStudents[key].id}>{otherStudents[key].firstName} {otherStudents[key].lastName}</option>)}
            {Object.keys(otherStudents).length === 0 && <option key={2} value="none" disabled>No Students</option>}
        </select>
    )
} 