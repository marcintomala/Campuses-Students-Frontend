import React, {useEffect, useState } from "react";
import axios from "axios";

/* Students Context manager. It all works surprisingly well for what it feels like. */

export const StudentsContext = React.createContext({
    students : {},
    addStudent: (firstName, lastName, imageUrl, email, gpa) => {},
    setStudents: () => {},
    editStudent: (student) => {},
    deleteStudent: (id) => {},
    changeCampus: (studentId, campusId) => {}, 
    getByCampus: (campusId, complement) => {}
});

export default function Students(props) {
    const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    const [ students, setStudents ] = useState(
        {"-1": {
            id: -1, 
            firstName: "Placeholder", 
            lastName: "Student",
            imageUrl: placeholderImage, 
            email: 'example@mail.com', 
            gpa: 4.0, 
            campusId: "-1"}
        });

    useEffect(() => {
        fetchStudents();
    }, [])

    async function fetchStudents() {
        const response = await axios.get('https://ttp-college-db.herokuapp.com/students');
        const students = {};
        for (let i = 0; i < response.data.length; i++) {
            students[response.data[i].id] = response.data[i];
        }
        if (students) {
            setStudents(students);
        }
    }

    async function editStudent(student) {
        console.log(student);
        await axios.put('https://ttp-college-db.herokuapp.com/students', {
            id : student.id,
            firstName : student.firstName,
            lastName : student.lastName,
            imageUrl : student.imageUrl,
            email : student.email,
            gpa : student.gpa,
            campusId : student.campusId
        })
        setStudents(prevStudents => {
            const newStudents = {...prevStudents};
            newStudents[student.id] = student;
            return newStudents
        });
    }

    async function addStudent(firstName, lastName, imageUrl, email, gpa) {
        const response = await axios.post('https://ttp-college-db.herokuapp.com/students', {
            firstName : firstName,
            lastName : lastName,
            imageUrl : imageUrl,
            email : email,
            gpa : gpa
        });
        const newStudent = await response.data.student;
        setStudents(prevStudents => {
            const newStudents = {...prevStudents};
            newStudents[newStudent.id] = newStudent;
            return newStudents;
        })
        return response;
    }
    
    async function deleteStudent(id) {
        await axios.delete('https://ttp-college-db.herokuapp.com/students/' + id);
        setStudents(prevStudents => {
            const newStudents = {...prevStudents};
            delete newStudents[id];
            return newStudents;
        })
    }

    async function changeCampus(studentId, campusId) {
        await axios.put('https://ttp-college-db.herokuapp.com/students', {
            id: studentId,
            campusId: campusId
        })
        setStudents(prevStudents => {
            const newStudents = {...prevStudents}
            newStudents[studentId].campusId = campusId;
            return newStudents;
        })
    }
    
    function getByCampus(campusId, complement) {
        const studentIds = Object.keys(students);
        const campusStudents = {};
        if (!complement) {
            for (let i = 0; i < studentIds.length; i++) {
                if (students[studentIds[i]].campusId === campusId) {
                    campusStudents[studentIds[i]] = students[studentIds[i]];
                }
            }
        } else {
            for (let i = 0; i < studentIds.length; i++) {
                if (students[studentIds[i]].campusId !== campusId) {
                    campusStudents[studentIds[i]] = students[studentIds[i]];
                }
            }
        }
        return campusStudents;
    }
    
    return (
        <StudentsContext.Provider value={{students: students, addStudent: addStudent, setStudents : setStudents,
            editStudent: editStudent, deleteStudent: deleteStudent, changeCampus: changeCampus, getByCampus: getByCampus}}>
            {props.children}
        </StudentsContext.Provider>
    )
}