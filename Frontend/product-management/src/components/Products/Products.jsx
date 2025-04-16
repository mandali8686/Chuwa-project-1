import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features/product/productReducer";
import ProductItem from './ProductItem';
import './Products.css';
import { useNavigate } from "react-router-dom";
import { Pagination, Row, Col} from "antd";
import SortDropdown from "./Dropdown";


function Products() {
  const dispatch = useDispatch();
  const { list: products, loading, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const [sortKey, setSortKey] = useState('last');


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleAddProduct = ()=>{
    navigate('/create-product');
  }
  const getSortedProducts = () => {
    const sorted = [...products]; // clone to avoid mutating state
    if (sortKey === 'priceLow') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortKey === 'priceHigh') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortKey === 'last') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return sorted;
  };

  const paginatedProducts = getSortedProducts().slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="products-page">

      <div className="products-header">
        <h1>Products</h1>

        
        <div className="products-controls">
        <SortDropdown onSortChange={setSortKey} />
        {(user.role==='admin')&&<button className="add-btn" onClick={handleAddProduct}>Add Product</button>}
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <Row gutter={[24, 24]}>
        {paginatedProducts.map((product, index) => (
          <Col
            key={index}
            xs={24} sm={12} md={8} lg={6} xl={6}
          >
            <ProductItem
            id={product._id}
            image={product.imageUrl || 'https://cdn.pixabay.com/photo/2013/07/13/12/46/iphone-160307_1280.png'}
            name={product.name}
            price={product.price}
            description={product.description}
            category={product.category || 'Category Placeholder'}
            outOfStock={product.outOfStock}
            />
          </Col>
        ))}
      </Row>
      
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


