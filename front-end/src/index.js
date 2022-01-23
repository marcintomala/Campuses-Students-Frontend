import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CampusesProvider from './contexts/campusesContext';
import StudentsProvider from './contexts/studentsContext'
import { HashRouter } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(
  <React.StrictMode>
    <CampusesProvider>
      <StudentsProvider>
        <HashRouter>
          <App />
        </HashRouter>  
      </StudentsProvider>
    </CampusesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
