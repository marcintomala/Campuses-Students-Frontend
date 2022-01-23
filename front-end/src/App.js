import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import PageWrapper from './PageWrapper'
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
              <Route index element={<PageWrapper title="Home"><Home /></PageWrapper>}/>
              <Route path="/students" element={<PageWrapper title="Students"><Students /></PageWrapper>}/>
              <Route path="/students/:id" element={<PageWrapper title="Single Student View"><Student /></PageWrapper>}/>
              <Route path="/students/:id/edit" element={<PageWrapper title="Edit Student"><EditStudent /></PageWrapper>}/>
              <Route path="students/add" element={<PageWrapper title="Add Student"><AddStudent /></PageWrapper>} />
              <Route path="campuses" element={<PageWrapper title="Campuses"><Campuses/></PageWrapper>}/>
              <Route path="/campuses/:id" element={<PageWrapper title="Campus"><Campus /></PageWrapper>}/>
              <Route path="/campuses/:id/edit" element={<PageWrapper title="Edit Campus"><EditCampus /></PageWrapper>} />
              <Route path="campuses/add" element={<PageWrapper title="Add Campus"><AddCampus /></PageWrapper>} />
              <Route path="*" element={<PageWrapper title="Page Does Not Exist"><NoMatch /></PageWrapper>} />
            </Route>
          </Routes>
    </div>
  );
}

export default App;
