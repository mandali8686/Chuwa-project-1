import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { addCartItem, removeCartItem, selectQuantityById } from '../../features/cart';

import { setCurrentProduct } from "../../features/product/productReducer";
import "./ProductItem.css";

function ProductItem({ id, image, name, price, description, category, stock, outOfStock }) {

  const quantity = useSelector(selectQuantityById(id));

  const user = useSelector((state) => state.user.currentUser);
  // console.log('Cur User', user);

  const userId = useSelector((state) => state.user.currentUser?._id);



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentProduct({ id, image, name, price, description, category, stock, outOfStock }));
    navigate("/product-details");
  };

  const increment = () => {

    if (outOfStock) {
      navigate("/error");
      return;
    }


    //  setQuantity((prev) => prev + 1)
     const payload = { id, name, price, image, userId };
     dispatch(addCartItem(payload));
    }

  const decrement = () =>{
    // setQuantity((prev) => Math.max(0, prev - 1));
    const payload = { id, name, price, image, userId };
     dispatch(removeCartItem(payload));
  }

  const handleEditClick = () => {
    dispatch(setCurrentProduct({ id, image, name, price, description, category, stock, outOfStock }));
    navigate("/create-product");
  };



  // useEffect(() => {
  //   if (itemInCart) {
  //     setQuantity(itemInCart.cartQuantity);
  //   } else {
  //     setQuantity(0);
  //   }
  // }, [itemInCart]);

  return (
    <div className="product-item-container" onClick={handleClick}>
      <img className="product-image" src={image} alt={name} />
      <div className="product-info">
        <strong className="product-name">{name}</strong>
        <p className="product-price">
          ${typeof price === "number" ? price.toFixed(2) : "N/A"}
        </p>
        <div className="product-controls" onClick={(e) => e.stopPropagation()}>
          <div className="quantity-box">
            <button className="qty-btn" onClick={decrement}>
              −
            </button>
            <span className="quantity">{quantity}</span>
            <button className="qty-btn" onClick={increment}>
              +
            </button>
          </div>
          {(user.role==='admin')&&<button className="edit-btn" onClick={handleEditClick}>Edit</button>}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
