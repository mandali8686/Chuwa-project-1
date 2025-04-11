
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { clearUser } from '../../features/user';
import './NavBar.css';
import { useSelector } from 'react-redux';
import ShoppingCart from '../Cart/ShoppingCart';


const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {currentUser, isAuthenticated} = useSelector(state => state.user)

    const [isCartOpen, setIsCartOpen] = useState(false)
    const toggleCart = () => {
      setIsCartOpen(!isCartOpen);
    };

  const dispatch = useDispatch();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogOut = () => {
    dispatch(clearUser());
    closeMobileMenu();
  }
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
          {!isAuthenticated ? (<li className="nav-item">
            <NavLink
              to="/SignIn"
              className={({ isActive }) =>

                `nav-links ${isActive ? 'active' : ''}`

              }
              onClick={closeMobileMenu}
            >
              Sign In
            </NavLink>
          </li>): (<li className="nav-item">
            <button
             className="nav-links"
             style={{ background: 'none', border: 'none', cursor: 'pointer' }}
             onClick={handleLogOut}
            >
             Sign Out
            </button>
          </li>)}

          <li className="nav-item">
            <button
            className="nav-links"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick ={toggleCart}
            >
            Cart
            </button>
          </li>
        </ul>
      </div>
        {isCartOpen && <ShoppingCart toggleCart={toggleCart} />}
    </nav>
  );
};

export default NavBar;
