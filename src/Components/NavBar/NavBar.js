import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
        Header
      <ul>
        <li>
          <Link to="/component1">Component 1</Link>
        </li>
        <li>
          <Link to="/component2">Component 2</Link>
        </li>
        <li>
          <Link to="/component3">Component 3</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
