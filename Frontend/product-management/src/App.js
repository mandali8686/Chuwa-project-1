import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/NavBar/NavBar';
import Products from './components/Products/Products';
import SignIn from './components/SignIn';
import Signup from './components/SignUp';
import { useSelector } from "react-redux";

function App() {
  const [loading, setLoading] = useState(true);

  // Get the users from Redux store using useSelector
  const { users, user, status } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route exact path="/" element={<Navbar />} />
    </Routes>
  );
}

export default App;
