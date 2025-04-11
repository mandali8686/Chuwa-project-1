import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features/product/productReducer";
import ProductItem from './ProductItem';
import './Products.css';
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";

function Products() {
  const dispatch = useDispatch();
  const { list: products, loading, error } = useSelector((state) => state.product);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleAddProduct = ()=>{
    navigate('/create-product');
  }

  const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="products-page">

      <div className="products-header">
        <h1>Products</h1>
        <div className="products-controls">
          <select>
            <option>Last added</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
          </select>
          <button className="add-btn" onClick={handleAddProduct}>Add Product</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div className="product-grid">
          {paginatedProducts.map((product, index) => (
            <ProductItem
              key={index}
              image={product.imageUrl || 'https://cdn.pixabay.com/photo/2013/07/13/12/46/iphone-160307_1280.png'}
              name={product.name}
              price={product.price}
              description={product.description}
              category={product.category || 'Category Placeholder'}
              outOfStock={product.outOfStock}
            />
          ))}
        </div>
      )}

      <div className="pagination">
      <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={products.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
      </div>
    </div>
  );
}

export default Products;
