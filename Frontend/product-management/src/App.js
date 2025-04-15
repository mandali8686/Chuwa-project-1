import { Routes, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/auth/SignUp';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Layout from './components/Layout'; // new
import CreateProduct from './components/CreateProduct/CreateProduct';
import ErrorPage from './components/ErrorPage/ErrorPage';
import SignIn from './components/auth/SignIn';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './features/user';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      dispatch(setCurrentUser(user));
    }
  }, [dispatch]);

  return (
    <Routes>
    <Route element={<Layout />}>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/error" element={<ErrorPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/products" element={<Products />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/" element={<Products />} />
      </Route>
    </Route>
  </Routes>
  );
}

export default App;
