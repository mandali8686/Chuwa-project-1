import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductItem.css";

function ProductItem({ image, name, price, description, category, outOfStock }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/product-details", {
      state: { image, name, price, description, category, outOfStock },
    });
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="product-item-container" onClick={handleClick}>
      <img className="product-image" src={image} alt={name} />
      <div className="product-info">
        <strong className="product-name">{name}</strong>
        <p className="product-price">${price.toFixed(2)}</p>
        <div
          className="product-controls"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="quantity-box">
            <button className="qty-btn" onClick={decrement}>−</button>
            <span className="quantity">{quantity}</span>
            <button className="qty-btn" onClick={increment}>+</button>
          </div>
          <button className="edit-btn">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
