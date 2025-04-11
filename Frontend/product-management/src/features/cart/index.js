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
        addCartItem: (state, action) => {
            const { id, name, price, image } = action.payload;
            if (state.CartItems[id]) {
                state.CartItems[id].cartQuantity += 1;
            } else {
                state.CartItems[id] = { id, name, price, image, cartQuantity: 1 };
            }
            state.count++
            state.totalPrice += price
        },
        removeCartItem: (state, action) => {
            const { id, price } = action.payload;
            if(state.CartItems[id]) {
                if(state.CartItems[id].cartQuantity > 1) {
                    state.CartItems[id].cartQuantity -= 1;
                } else {
                    delete state.CartItems[id]
                }
                state.totalPrice -= price;
                state.count--
            }
        },
        clearCart: (state) => {
            state.CartItems = {};
        },
    }
})

export const selectQuantityById = (id) => (state) => {
    return state.cart.CartItems[id]?.cartQuantity || 0;
  };

export const { addCartItem, removeCartItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
