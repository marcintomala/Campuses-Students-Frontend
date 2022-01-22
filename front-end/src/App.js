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
import StudentProfile from "./components/StudentProfile"
import CampusProfile from "./components/CampusProfile";

function App() {
  return (
    <div className='app'>
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} >
          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<StudentProfile />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/:id/edit" element={<EditStudent />} />
          <Route path="campuses" element={<Campuses/>} />
          <Route path="campuses/:id" element={<CampusProfile />} />
          <Route path="campuses/add" element={<AddCampus />} />
          <Route path="campuses/:id/edit" element={<EditCampus />} />
        </Route>
      </Routes>
    </HashRouter>
  </div>
  );
}

export default App;
