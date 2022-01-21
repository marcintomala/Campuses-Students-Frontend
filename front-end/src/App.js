import React from "react";
import { HashRouter, Route, Routes,} from "react-router-dom";
import Home from "./components/Home";
import './App.css';
import Campuses from "./components/Campuses";
import Students from "./components/Students";
import EditStudent from "./components/EditStudent";
import AddStudent from "./components/AddStudent"

function App() {
  return (
    <div className='app'>
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} >
          <Route exact path="campuses" element={<Campuses/>} />
          <Route path="students" element={<Students />} />
          <Route path="students/:id/edit" element={<EditStudent />} />
          <Route path="students/add" element={<AddStudent />} />
        </Route>
      </Routes>
    </HashRouter>
  </div>
  );
}

export default App;
