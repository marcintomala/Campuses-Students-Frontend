import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import Home from "./components/Home";
import Students from "./components/Students";
import Student from "./components/Student";
import EditStudent from "./components/EditStudent";
import AddStudent from "./components/AddStudent"
import Campuses from "./components/Campuses";
import Campus from "./components/Campus";
import EditCampus from "./components/EditCampus";
import AddCampus from "./components/AddCampus";
import NoMatch from "./components/NoMatch";

function App() {
  return (
    <div className='app'>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}/>
              <Route path="/students" element={<Students />}/>
              <Route path="/students/:id" element={<Student />}/>
              <Route path="/students/:id/edit" element={<EditStudent />}/>
              <Route path="students/add" element={<AddStudent />} />
              <Route path="campuses" element={<Campuses/>}/>
              <Route path="/campuses/:id" element={<Campus />}/>
              <Route path="/campuses/:id/edit" element={<EditCampus />} />
              <Route path="campuses/add" element={<AddCampus />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
    </div>
  );
}

export default App;
