
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { clearUser } from '../../features/user';
import './NavBar.css';
// import { useSelector } from 'react-redux';
import ShoppingCart from '../Cart/ShoppingCart';
import { FaCartShopping } from "react-icons/fa6";
import { message } from "antd";
import { clearProductState, setCurrentProduct } from '../../features/product/productReducer';


const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {currentUser, isAuthenticated} = useSelector(state => state.user)
    const { totalPrice } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.currentUser);
    const navigate =useNavigate();
    // console.log('Cur User', user);

    const [isCartOpen, setIsCartOpen] = useState(false)
    const toggleCart = () => {
      if(!user){
        message.error('Please Sign In to Access Shopping Cart.')
        navigate("/signin");
        return;
      }
      setIsCartOpen(!isCartOpen);
    };

  const dispatch = useDispatch();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    dispatch(setCurrentProduct(null));
    setIsMobileMenuOpen(false);
  };

  const handleLogOut = () => {
    dispatch(clearUser());
    // dispatch(setCurrentProduct(null));
    closeMobileMenu();
    message.success('You have signed out.');
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
            <FaCartShopping />
            <span style={{ marginLeft: '6px' }}>${totalPrice ? totalPrice.toFixed(2) : '0.00'}</span>
            </button>
          </li>
        </ul>
      </div>
        {isCartOpen && isAuthenticated && <ShoppingCart toggleCart={toggleCart} />}
    </nav>
  );
};

export default NavBar;
