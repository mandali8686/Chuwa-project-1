import { Routes, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/auth/SignUp';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Layout from './components/Layout'; // new
import CreateProduct from './components/CreateProduct/CreateProduct';
import ErrorPage from './components/ErrorPage/ErrorPage';
import SignIn from './components/auth/SignIn';

import UpdatePassword from './components/auth/UpdatePassword';
import ForgetPassword from './components/auth/ForgetPassword';

import { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './features/user';
import {fetchCart} from './features/cart'


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setCurrentUser(parsedUser));
      dispatch(fetchCart(parsedUser._id));
      setIsLoaded(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user._id));
    }
  }, [user, dispatch]);

  return (
    isLoaded ? (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/update-password/:token" element={<UpdatePassword />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/" element={<Products />} />
          </Route>
        </Route>
      </Routes>
    ) : (
      <div>Loading...</div>
    )

  );
}

export default App;
