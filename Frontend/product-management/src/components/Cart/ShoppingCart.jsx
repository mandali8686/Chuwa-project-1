import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from './CartItem';
import styled from '@emotion/styled';

const ShoppingCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    position: fixed;
    top: 0px;
    right: 0px;
    width: 33.33vw;
    z-index: 1000;
    background: white;
    height: 75vh;
    overflow-y: auto;
  }
  @media (max-width: 767px) {
    width: 100%;
    height: 100vh;
    background: white;
    overflow-y: auto;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartHeader = styled.div`
  background-color: rgb(109, 101, 224);
  padding: 15px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  display: flex;
  justify-content: space-between;
`;

const ShoppingCartContent = styled.div`
  flex-grow: 1;
`;

const CartFooter = styled.div`
  padding: 15px;
`;

const DiscountInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const CheckoutButton = styled.button`
  background-color: rgb(109, 101, 224);
  color: white;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: rgb(89, 81, 204);
  }
`;

const Discount = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const DiscountButton = styled.button`
  background-color: rgb(109, 101, 224);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: rgb(89, 81, 204);
  }
`;

const CloseButton = styled.button`
  background-color: rgb(109, 101, 224);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 90%;
  margin-top: 0px;
  font-weight: bold;
  &:hover {
    background-color: red;
  }
`;

const ShoppingCart = ({ toggleCart }) => {
  const { CartItems, totalPrice, count } = useSelector((state) => state.cart);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const TAX = 0.0725;

  useEffect(() => {
    const calValue = (totalPrice - discount) + TAX * totalPrice;
    setTotal(calValue);
  }, [totalPrice, discount]);

  useEffect(() => {
    if (count === 0) {
      setDiscount(0);
      setDiscountCode(null);
      setError(null);
    }
  }, [count]);

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
    setError(null);
  };

  const applyDiscount = () => {
    if (discountCode === "20 DOLLAR OFF") {
      setDiscount(20);
      setError(null);
    } else {
      setDiscount(0);
      setError("Invalid discount code");
    }
  };

  return (
    <ModalBackdrop>
      <ShoppingCartContainer>
        <CartHeader>
          <div style={{ display: "flex", alignItems: "center", color: "white" }}>
            <span style={{ fontSize: "1.5rem" }}>Cart</span>
            <span style={{ fontSize: "1rem", marginLeft: "0.4rem" }}>
              {count > 0 && `(${count})`}
            </span>
          </div>
          <button
            style={{
              border: "none",
              background: "none",
              fontSize: "1.5rem",
              color: "white",
              cursor: "pointer",
            }}
            className="close-button"
            onClick={toggleCart}
          >
            X
          </button>
        </CartHeader>
        <ShoppingCartContent>
          <div>
            {Object.values(CartItems).length > 0 ? (
              Object.values(CartItems).map((product, index) => (
                <CartItem
                  key={index}
                  id={product._id}
                  image={product.imageUrl || "https://cdn.pixabay.com/photo/2013/07/13/12/46/iphone-160307_1280.png"}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  category={product.category || "Category Placeholder"}
                  outOfStock={product.outOfStock}
                  cartQuantity={product.cartQuantity}
                />
              ))
            ) : (
              <div
                style={{
                  padding: "40px 20px",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  color: "#666",
                  fontWeight: 500,
                }}
              >
                Empty Cart, please add items
              </div>
            )}
          </div>
        </ShoppingCartContent>
        <CartFooter>
          <div style={{ fontSize: "1.0rem", color: "#666", marginBottom: "10px", fontWeight: 400 }}>
            Apply Discount Code
          </div>
          <Discount>
            <DiscountInput
              placeholder="20 DOLLAR OFF"
              value={discountCode}
              onChange={handleDiscountChange}
            />
            <DiscountButton onClick={applyDiscount}>Apply</DiscountButton>
          </Discount>
          <div style={{ fontSize: "1.0rem", color: "#666", fontWeight: 500 }}>
            {error && <div>{error}</div>}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              marginBottom: "10px",
              fontWeight: "bold",
              borderTop: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <div>Subtotal:</div> <div>${totalPrice.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: "bold", padding: "10px" }}>
            <div>Tax:</div> <div>${(TAX * totalPrice).toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: "bold", padding: "10px" }}>
            <div>Discount:</div> <div>-${discount.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: "bold", padding: "10px" }}>
            <div>Estimated Total:</div> <div>${total.toFixed(2)}</div>
          </div>
          <CheckoutButton>Continue to Checkout</CheckoutButton>
        </CartFooter>
      </ShoppingCartContainer>
    </ModalBackdrop>
  );
};

export default ShoppingCart;
