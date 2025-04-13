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
        clearCartItem: (state, action) => {
            const { id } = action.payload;
            const itemToRemove = state.CartItems[id];
            const {cartQuantity, price} = itemToRemove
            delete state.CartItems[id]
            state.totalPrice -= cartQuantity*price
            state.count -= cartQuantity
        },
        clearCart: (state) => {
            state.CartItems = {};
            state.totalPrice = 0;
            state.count = 0;
        }
    }
})


export const { addCartItem, removeCartItem, clearCart, clearCartItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
