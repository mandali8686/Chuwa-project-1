import { Routes, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import Signup from './components/auth/SignUp';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Layout from './components/Layout'; // new
import CreateProduct from './components/CreateProduct/CreateProduct';
import ErrorPage from './components/ErrorPage/ErrorPage';
import SignIn from './components/auth/SignIn';

function App() {
  return (
    <Routes>
      

      
      <Route element={<Layout />}>

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/" element={<Products />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/error" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
