import React from "react";
import { HashRouter, Route, Routes,} from "react-router-dom";
import Home from "./components/Home";
import './App.css';
import Campuses from "./components/Campuses";

function App() {
  return (
    <div className='app'>
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} >
          <Route exact path="campuses" element={<Campuses/>} />
          <Route path="students" />
        </Route>
      </Routes>
    </HashRouter>
  </div>
  );
}

export default App;
