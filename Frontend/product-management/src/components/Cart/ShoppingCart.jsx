import { useSelector } from "react-redux";
import CartItem from './CartItem';
import styled from '@emotion/styled';

const ShoppingCartContainer = styled.div`
  @media (min-width: 768px) {
    position: fixed;
    top: 0px;
    right: 0px;
    width: 33.33vw;
    z-index: 1000;
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
`;


const CartFooter = styled.div`
  padding: 15px;
  border-top: 1px solid #ccc;
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

const ShoppingCart = ({toggleCart}) => {
    const { CartItems, totalPrice, count } = useSelector((state) => state.cart);
    //const cartRef = useRef(null);

    return(
        <ModalBackdrop>
        <ShoppingCartContainer>
        <CartHeader>
            <span style={{ color: "white", textAlign:"start"}}>Cart</span>
            <button className="close-button" onClick={toggleCart}>X</button>
        </CartHeader>
          <div>
              {Object.values(CartItems).map((product, index) => {
                  return <CartItem
                  key={index}
                  image={product.image || 'https://cdn.pixabay.com/photo/2013/07/13/12/46/iphone-160307_1280.png'}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  category={product.category || 'Category Placeholder'}
                  outOfStock={product.outOfStock}
                  cartQuantity={product.cartQuantity}
                  />
              })}
            </div>
          <CartFooter>
            <DiscountInput
              placeholder="Enter discount code"
              // value={discountCode}
              // onChange={handleDiscountChange}
            />
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              Subtotal: ${totalPrice.toFixed(2)}
            </div>
            <CheckoutButton>Continue to Checkout</CheckoutButton>
          </CartFooter>
        </ShoppingCartContainer>
        </ModalBackdrop>
    )
}

export default ShoppingCart;
