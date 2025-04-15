import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    CartItems: {}, //{id:{item detail}},
    loading: false,
    totalPrice: 0,
    count: 0,
    error: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartFromLocalStorage: (state, action) => {
            const { userId } = action.payload;
            const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`));
            if (storedCart) {
                state.CartItems = storedCart.CartItems || {};
                state.totalPrice = storedCart.totalPrice || 0;
                state.count = storedCart.count || 0;
              }
        },
        addCartItem: (state, action) => {
            const { id, name, price, image, userId } = action.payload;
            if (state.CartItems[id]) {
                state.CartItems[id].cartQuantity += 1;
            } else {
                state.CartItems[id] = { id, name, price, image, cartQuantity: 1 };
            }
            state.count++
            state.totalPrice += price
            localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
        },
        removeCartItem: (state, action) => {
            const { id, price, userId } = action.payload;
            if(state.CartItems[id]) {
                if(state.CartItems[id].cartQuantity > 1) {
                    state.CartItems[id].cartQuantity -= 1;
                } else {
                    delete state.CartItems[id]
                }
                state.totalPrice -= price;
                state.count--
            }
            localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
        },
        clearCartItem: (state, action) => {
            const { id, userId } = action.payload;
            const itemToRemove = state.CartItems[id];
            const {cartQuantity, price} = itemToRemove
            delete state.CartItems[id]
            state.totalPrice -= cartQuantity*price
            state.count -= cartQuantity
            localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
        },
        clearCart: (state) => {
            state.CartItems = {};
            state.totalPrice = 0;
            state.count = 0;
            localStorage.removeItem('cart');
        }
    }
})

export const selectQuantityById = (id) => (state) => {
    return state.cart.CartItems[id]?.cartQuantity || 0;
  };

export const { addCartItem, removeCartItem, clearCart, clearCartItem, setCartFromLocalStorage } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
