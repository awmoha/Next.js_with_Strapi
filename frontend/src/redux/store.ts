import { configureStore } from "@reduxjs/toolkit";
import authReducer from "redux/login-reducer";
import dataReducer from "redux/data-strapi";
import cartReducer from "redux/cartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
