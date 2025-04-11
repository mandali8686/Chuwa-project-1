import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ProductDetails.css";
import { useNavigate } from "react-router-dom";


function ProductDetails() {
  const product = useSelector((state) => state.product.currentProduct);
  const [quantity, setQuantity] = useState(0);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      navigate("/error"); 
    }
  }, [product, navigate]);

  if (!product) return null; 

  const { image, name, price, description, category, outOfStock } = product;

  return (
    <div className="product-detail-wrapper">
      
      <h1 className="product-detail-title">Product Details</h1>
      <div className="product-detail-container">
        <div className="product-detail-left">
          <img className="product-detail-image" src={image} alt={name} />
        </div>
        <div className="product-detail-right">
          <p className="product-detail-category">{category}</p>
          <h2 className="product-detail-name">{name}</h2>
          <div className="product-detail-price-stock">
            <span className="product-detail-price">
              ${typeof price === "number" ? price.toFixed(0) : "N/A"}
            </span>
            {outOfStock && <span className="out-of-stock">Out of Stock</span>}
          </div>
          <p className="product-detail-description">{description}</p>
          <div className="product-detail-buttons">
            <div className="quantity-box">
              <button className="qty-btn" onClick={decrement}>−</button>
              <span className="quantity">{quantity}</span>
              <button className="qty-btn" onClick={increment}>+</button>
            </div>
            <button className="detail-edit-btn">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
