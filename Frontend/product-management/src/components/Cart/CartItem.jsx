import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productReducer, setCurrentProduct } from "../../features/product/productReducer";
import { addCartItem, removeCartItem, selectQuantityById, clearCartItem} from '../../features/cart'
import { QuantityBox, QtyButton, Quantity } from "../common/QuantityControl"; 
import styled from '@emotion/styled';

const ProductItemContainer = styled.div`

  padding: 20px;
  margin: 10px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  height: 200px;
`;


const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  height: 100%;
  width: 60%;
`;

const ProductControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

// const QuantityBox = styled.div`
//   display: flex;
//   align-items: center;
// `;

const EditButton = styled.button`
  color: black;
  padding: 5px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  background: none;
`;

function CartItem({ id, image, name, price, description, cartQuantity, category, stock, outOfStock }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser?._id);
  const { error } = useSelector(state => state.cart);



  const handleClick = () => {
    dispatch(setCurrentProduct({ id, image, name, price, description, category, stock, outOfStock }));
    navigate("/product-details");
  };

  const increment = () => {
    const payload = { id, name, price, image, userId };
    dispatch(addCartItem(payload));
  };

  const decrement = () => {
    const payload = { id, name, price, image, userId };
    dispatch(removeCartItem(payload));
  };

  return (
    <ProductItemContainer onClick={handleClick}>
        <img  src={image} alt={name} style={{width:"50%",height: "auto", objectFit: "cover"}}/>
      <ProductInfo>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong className="product-name">{name}</strong>
          <p className="product-price" style={{margin: 0, alignSelf: "center"}}>${typeof price === "number" ? price.toFixed(2) : "N/A"}</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <ProductControls onClick={(e) => e.stopPropagation()}>
          <QuantityBox>
                  <QtyButton onClick={decrement}>−</QtyButton>
                  <Quantity>{cartQuantity}</Quantity>
                  <QtyButton onClick={increment}>+</QtyButton>
              </QuantityBox>
          <EditButton onClick={() => dispatch(clearCartItem({userId, id}))}>Remove</EditButton>
        </ProductControls>
      </ProductInfo>
    </ProductItemContainer>
  );
}

export default CartItem;
