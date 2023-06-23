import { configureStore } from "@reduxjs/toolkit";
import authReducer from "redux/login-reducer";
import dataReducer from "redux/data-strapi";
import cartReducer from "redux/cartSlice";
import postReducer from "./postReducer";
import favouritesReducer from "./favourites";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    cart: cartReducer,
    post: postReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
