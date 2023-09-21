import React from 'react';
import './Header.css'; 
import { Link } from "react-router-dom";


function Header() {
  return (
    <nav className="navbar">
      <div className="left">
        <span className="logo">ADMIN</span>
      </div>
      <div className="right">
        <ul>
          <li>
            <Link to="/Admin_register">
                <button >Register</button>
            </Link>
          </li>
          <li>
            <Link to="/Admin_login">
                <button >Login</button>
            </Link>
            </li>
          <li>
            <Link to="/">
                <button >Back</button>
            </Link>
        </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
