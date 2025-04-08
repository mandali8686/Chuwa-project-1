import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductDetails.css";
import Navbar from "../NavBar/NavBar";

function ProductDetails() {
  const { state } = useLocation();
  const { image, name, price, description, category , outOfStock } = state || {};

  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="product-detail-wrapper">
        <Navbar />
      <h1 className="product-detail-title">Products Detail</h1>
      <div className="product-detail-container">
        <div className="product-detail-left">
          <img className="product-detail-image" src={image} alt={name} />
        </div>
        <div className="product-detail-right">
          <p className="product-detail-category">{category}</p>
          <h2 className="product-detail-name">{name}</h2>
          <div className="product-detail-price-stock">
            <span className="product-detail-price">${price?.toFixed(0)}</span>
            {outOfStock && <span className="out-of-stock">Out of Stock</span>}
          </div>
          <p className="product-detail-description">{description}</p>
          <div className="product-detail-buttons">
            {/* <button className="detail-add-btn">Add To Cart</button> */}
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
