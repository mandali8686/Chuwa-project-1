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
  }
  @media (max-width: 767px) {
    width: 100%;
    height: 100vh;
    background: white;
  }
`

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998; /* Behind the modal */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartHeader = styled.div`
  background-color:rgb(109, 101, 224);
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
  margin-bottom: 10px;
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


const CloseButton = styled.button`
  background-color: rgb(109, 101, 224);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-left:90%;
  margin-top:0px;
  font-weight: bold;

  &:hover {
    background-color: red;
  }
`;

const ShoppingCart = ({toggleCart}) => {
    const { CartItems, totalPrice, count } = useSelector((state) => state.cart);
    //const cartRef = useRef(null);

    return(
        <ModalBackdrop>
        <ShoppingCartContainer>
        <CartHeader>
        <div style={{ display: "flex", alignItems: "center", color: "white" }}>
          <span style={{ fontSize: "1.5rem" }}>Cart</span>
          <span style={{ fontSize: "1rem", marginLeft: "0.4rem" }}>{count>0 && `(${count})`}</span>
        </div>
            <button style={{
                border: "none",
                background: "none",
                fontSize: "1.5rem",
                color: "white",
                cursor: "pointer"
              }}
          className="close-button" onClick={toggleCart}>X</button>
        </CartHeader>
        <ShoppingCartContent>
          <div>
          {Object.values(CartItems).length > 0 ? (
                Object.values(CartItems).map((product, index) => (
                      <CartItem
                        key={index}
                        id= {product.id}
                        image={product.image || 'https://cdn.pixabay.com/photo/2013/07/13/12/46/iphone-160307_1280.png'}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        category={product.category || 'Category Placeholder'}
                        outOfStock={product.outOfStock}
                        cartQuantity={product.cartQuantity}
                      />
                    ))
                  ) : (
                    <div  style={{
                      padding: '40px 20px',
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      color: '#666',
                      fontWeight: 500,
                    }}>Empty Cart, please add items</div>
                  )}
            </div>
          </ShoppingCartContent>
          <CartFooter>
            <DiscountInput
              placeholder="Enter discount code"
              // value={discountCode}
              // onChange={handleDiscountChange}
            />
            <div style={{ marginBottom: '10px', fontWeight: 'bold', borderTop: "1px solid #ccc", padding:"5px" }}>
              Subtotal: ${totalPrice.toFixed(2)}
            </div>
            <CheckoutButton>Continue to Checkout</CheckoutButton>
          </CartFooter>
        </ShoppingCartContainer>
        </ModalBackdrop>
    )
}

export default ShoppingCart;
