import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // <-- import logger

import { userReducer } from '../features/user';
import { productReducer } from '../features/product/productReducer';
import { cartReducer } from '../features/cart/index';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});

export default store;
