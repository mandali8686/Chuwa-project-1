import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from '../features/user';
import { productReducer } from "../features/product/productReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer, 
  },
  devTools: true
})

export default store;
