import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { addCartItem, removeCartItem, selectQuantityById } from '../../features/cart';
import { setCurrentProduct } from "../../features/product/productReducer";
import { QuantityBox, QtyButton, Quantity } from "../common/QuantityControl";

const Wrapper = styled.div`
  padding: 30px 40px;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Container = styled.div`
  display: flex;
  gap: 40px;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Left = styled.div`
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
`;

const Right = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Category = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
`;

const Name = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PriceStock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const Price = styled.span`
  font-size: 22px;
  font-weight: bold;
`;

const OutOfStock = styled.span`
  background-color: #fdd;
  color: #d00;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
`;

const Description = styled.p`
  color: #444;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const Buttons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// const QuantityBox = styled.div`
//   display: flex;
//   align-items: center;
//   background: #f3f3f3;
//   border-radius: 6px;
//   padding: 4px 8px;
// `;

// const QtyButton = styled.button`
//   background-color: #6200ee;
//   color: white;
//   border: none;
//   padding: 6px 10px;
//   font-size: 16px;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const Quantity = styled.span`
//   margin: 0 10px;
//   font-weight: 600;
// `;

const EditButton = styled.button`
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px 18px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
`;

function ProductDetails() {
    const userId = useSelector((state) => state.user.currentUser?._id);
    const product = useSelector((state) => state.product.currentProduct);
    const quantity = useSelector(selectQuantityById(product?.id));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);

    useEffect(() => {
      if (!product) navigate("/error");
    }, [product, navigate]);

    if (!product) return null;

    const { id, image, name, price, description, category, stock, outOfStock } = product;

    const increment = () => {
      dispatch(addCartItem({ id, name, price, image, userId }));
    };

    const decrement = () => {
      dispatch(removeCartItem({ id, price, userId }));
    };

    const handleEditClick = () => {
      dispatch(setCurrentProduct({ id, image, name, price, description, category, stock, outOfStock }));
      navigate("/create-product");
    };

    return (
        <Wrapper>
          <Title>Product Details</Title>
          <Container>
            <Left>
              <Image src={image} alt={name} />
            </Left>
            <Right>
              <Category>{category}</Category>
              <Name>{name}</Name>
              <PriceStock>
                <Price>${typeof price === "number" ? price.toFixed(0) : "N/A"}</Price>
                {outOfStock && <OutOfStock>Out of Stock</OutOfStock>}
              </PriceStock>
              <Description>{description}</Description>
              <Buttons>
                <QuantityBox>
                  <QtyButton onClick={decrement}>−</QtyButton>
                  <Quantity>{quantity}</Quantity>
                  <QtyButton onClick={increment}>+</QtyButton>
                </QuantityBox>
                {user?.role === 'admin' && (
            <EditButton onClick={handleEditClick}>Edit</EditButton>
          )}
                
              </Buttons>
            </Right>
          </Container>
        </Wrapper>
  );
}

export default ProductDetails;
