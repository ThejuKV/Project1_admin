import React from 'react';
import './Admin_panel.css';
import './Admin_login';
import './Admin_register';
// import Admin from './Admin';
import { Link } from "react-router-dom";

function Admin_panel() {

  return (
    <div className="Admin_panel">
      <h1><b>Admin Panel</b></h1>
      <div className="button-container">
      <Link to="/Admin_login">
        <button className="login-button" >Login</button>
        </Link>
        <Link to="/Admin_register">
        <button className="register-button" >Register</button>
        </Link>
      </div>
      
    </div>
  );
}

export default Admin_panel;
