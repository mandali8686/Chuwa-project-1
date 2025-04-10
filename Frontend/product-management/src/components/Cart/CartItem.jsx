import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "../../features/product/productReducer";
// import "../Products/ProductItem.css";

import styled from '@emotion/styled';

const ProductItemContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  max-height: 300px;
  margin: 10px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;
  height: 350px;
`;

function CartItem({ image, name, price, description, cartQuantity, category,outOfStock}) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentProduct({ image, name, price, description, category, cartQuantity }));
    navigate("/product-details");
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <ProductItemContainer onClick={handleClick}>
      <img className="product-image" src={image} alt={name} />
      <div className="product-info">
        <strong className="product-name">{name}</strong>
        <p className="product-price">
          ${typeof price === "number" ? price.toFixed(2) : "N/A"}
        </p>
        <div className="product-controls" onClick={(e) => e.stopPropagation()}>
          <div className="quantity-box">
            <button className="qty-btn" onClick={decrement}>−</button>
            <span className="quantity">{quantity}</span>
            <button className="qty-btn" onClick={increment}>+</button>
          </div>
          <button className="edit-btn">Edit</button>
        </div>
      </div>
    </ProductItemContainer>
  );
}

export default CartItem;
