import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/CategorySlice.js";
import productReducer from "../features/ProductSlice.js";
import cartReducer from "../features/CartSlice.js";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;