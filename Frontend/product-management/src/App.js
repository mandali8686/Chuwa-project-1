import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Products from "./components/Products/Products";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
