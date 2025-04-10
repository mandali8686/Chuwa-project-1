
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';
import { useSelector } from 'react-redux';


const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {currentUser, isAuthenticated} = useSelector(state => state.user)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <NavLink
          to="/"
          className="navbar-logo"
          onClick={closeMobileMenu}
        >
          Management
        </NavLink>



        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>



        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>

          <li className="nav-item">
            <NavLink
              to="/SignIn"
              className={({ isActive }) =>

                `nav-links ${isActive ? 'active' : ''}`

              }
              onClick={closeMobileMenu}
            >
              Sign In
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/Cart"
              className={({ isActive }) =>

                `nav-links ${isActive ? 'active' : ''}`

              }
              onClick={closeMobileMenu}
            >
              Cart
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
};


export default NavBar;

