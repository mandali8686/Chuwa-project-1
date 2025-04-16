import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../features/user';
import { productReducer } from '../features/product/productReducer';
import { cartReducer } from '../features/cart/index';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
  devTools: true,
});

export default store;
