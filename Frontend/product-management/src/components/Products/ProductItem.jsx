import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from '../../features/cart'
import { setCurrentProduct } from "../../features/product/productReducer";
import "./ProductItem.css";

function ProductItem({ id, image, name, price, description, category, outOfStock }) {
  const itemInCart = useSelector(state =>
    state.cart.CartItems[id]
  );
  const [quantity, setQuantity] = useState(itemInCart?.cartQuantity?? 0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentProduct({ image, name, price, description, category, outOfStock }));
    navigate("/product-details");
  };

  const increment = () => {
     setQuantity((prev) => prev + 1)
     const payload = { id, name, price, image };
     dispatch(addCartItem(payload));
    }

  const decrement = () =>{
    setQuantity((prev) => Math.max(0, prev - 1));
    const payload = { id, name, price, image };
     dispatch(removeCartItem(payload));
  }

  useEffect(() => {
    if (itemInCart) {
      setQuantity(itemInCart.cartQuantity);
    } else {
      setQuantity(0);
    }
  }, [itemInCart]);

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
