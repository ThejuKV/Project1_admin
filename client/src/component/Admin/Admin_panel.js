import React from 'react';
import './Admin_panel.css';
import './Admin_login';
import './Admin_register';
import { Link } from "react-router-dom";
// import background_image from './Image/bg.jpg';


function Admin_panel() {

  return (
    <div className="Admin_panel">
      <h1><b>ADMIN PANEL</b></h1><br/>
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
