import React from "react";
import { HashRouter, Route, Routes,} from "react-router-dom";
import Home from "./components/Home";
import './App.css';
import Campuses from "./components/Campuses";
import Students from "./components/Students";
import EditStudent from "./components/EditStudent";
import AddStudent from "./components/AddStudent"
import EditCampus from "./components/EditCampus";
import AddCampus from "./components/AddCampus";
import Student from "./components/Student";
import Campus from "./components/Campus";

function App() {
  return (
    <div className='app'>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} >
            <Route exact path="students" element={<Students />} />
            <Route exact path="students/add" element={<AddStudent />} />
            <Route exact path="students/:id" element={<Student />} />
            <Route exact path="students/:id/edit" element={<EditStudent />} />
            <Route exact path="campuses" element={<Campuses/>} />
            <Route exact path="campuses/add" element={<AddCampus />} />
            <Route exact path="campuses/:id" element={<Campus />} />
            <Route exact path="campuses/:id/edit" element={<EditCampus />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
