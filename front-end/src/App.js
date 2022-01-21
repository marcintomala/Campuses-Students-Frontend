import React from "react";
import {
    BrowserRouter,
    Route,
    Switch,
    Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
      <BrowserRouter>
          <div>
              <nav>
                  <div className="Links">
                      <span className="Home"><Link to="/">Home</Link></span>
                      <span className="Students"><Link to="/students">Students</Link></span>
                      <span className="Campuses"><Link to="/campuses">Campuses</Link></span>
                  </div>
              </nav>
          </div>
      </BrowserRouter>
  );
}

export default App;
