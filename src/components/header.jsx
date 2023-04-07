import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/img/logo.jpg'
function Header() {
  return (
 

    
        <header>
          <nav>
            <ul>
              <li><Link to="/"> <img src={logo} alt="Logo" /></Link></li>
              <li><Link to="/products">Productos</Link></li>
              <li><Link to="/cursos">Cursos y Actividades</Link></li>
              <li><Link to="/contactUs">Contactenos</Link></li>
            </ul>
          </nav>
        </header>
      );
    }
    
  

export default Header;
