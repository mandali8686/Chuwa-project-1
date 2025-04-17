import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import styled from "@emotion/styled";
import { addCartItem, removeCartItem, selectQuantityById } from '../../features/cart';
import { setCurrentProduct } from "../../features/product/productReducer";
import { QuantityBox, QtyButton, Quantity } from "../common/QuantityControl";

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  margin: 10px auto;
  background: white;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor:pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  text-align: center;
  margin-top: 12px;
`;

const Name = styled.strong`
  font-size: 16px;
  display: block;
  margin-bottom: 4px;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

// const QuantityBox = styled.div`
//   display: flex;
//   align-items: center;
//   background: #f3f3f3;
//   border-radius: 6px;
//   padding: 4px 8px;
// `;

// const QtyButton = styled(Button)`
//   background-color: #6200ee;
//   color: white;
//   border: none;
// `;

const EditBtn = styled(Button)`
  border: 1px solid #ccc;
  background: white;
  border-radius: 6px;
`;

function ProductItem({ id, image, name, price, description, category, stock, outOfStock }) {
  const quantity = useSelector(selectQuantityById(id));
  const user = useSelector((state) => state.user.currentUser);
  const userId = user?._id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!user) {
      message.error('Please Sign In to View Product Details.');
      return;
    }
    dispatch(setCurrentProduct({ id, image, name, price, description, category, stock, outOfStock }));
    navigate("/product-details");
  };

  const increment = () => {
    if (!user) {
      message.error('Please Sign In to Add Product to Cart.');
      navigate("/signin");
      return;
    }
    if (outOfStock) {
      navigate("/error");
      return;
    }
    dispatch(addCartItem({ id, name, price, image, userId }));
  };

  const decrement = () => {
    if (!user) {
      message.error('Please Sign In to Add Product to Cart.');
      navigate("/signin");
      return;
    }
    dispatch(removeCartItem({ id, name, price, image, userId }));
  };

  const handleEditClick = () => {
    dispatch(setCurrentProduct({ id, image, name, price, description, category, stock, outOfStock }));
    navigate("/create-product");
  };

  return (
    <ProductCard onClick={handleClick}>
      <ProductImage src={image} alt={name} />
      <InfoSection>
        <Name>{name}</Name>
        <Price>${typeof price === "number" ? price.toFixed(2) : "N/A"}</Price>
        <Controls onClick={(e) => e.stopPropagation()}>
          <QuantityBox>
            <QtyButton size="small" onClick={decrement}>−</QtyButton>
            <span style={{ margin: "0 10px", fontWeight: 600 }}>{quantity}</span>
            <QtyButton size="small" onClick={increment}>+</QtyButton>
          </QuantityBox>
          {user?.role === 'admin' && (
            <EditBtn size="small" onClick={handleEditClick}>Edit</EditBtn>
          )}
        </Controls>
      </InfoSection>
    </ProductCard>
  );
}

export default ProductItem;
