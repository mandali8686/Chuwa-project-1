import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProductDetails.css";
import { useNavigate } from "react-router-dom";
import { addCartItem, removeCartItem, selectQuantityById } from '../../features/cart';
import { setCurrentProduct } from "../../features/product/productReducer";


function ProductDetails() {
  const userId = useSelector((state) => state.user.currentUser?._id);
  const product = useSelector((state) => state.product.currentProduct);
  const quantity = useSelector(product ? selectQuantityById(product.id) : () => 0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(addCartItem({ id: product.id, name, price, image, userId }));
  };

  const decrement = () => {
    dispatch(removeCartItem({ id: product.id, price, userId }));
  };

  useEffect(() => {
    if (!product) {
      navigate("/error");
    }
  }, [product, navigate]);

  if (!product) return null;

  const { id, image, name, price, description, category, stock, outOfStock } = product;
  console.log('Product', product);

  const handleEditClick = () => {
      dispatch(setCurrentProduct({ id, image, name, price, description, category, stock, outOfStock }));
      navigate("/create-product");
    };
    

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
            <button className="detail-edit-btn" onClick={handleEditClick}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
