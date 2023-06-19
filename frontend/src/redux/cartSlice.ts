import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CartState, Item } from "interfaces/interfaces";

const initialState: CartState = {
  cartItems: [],
  cartItemsNumber: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      state.cartItems.push(action.payload);
      state.cartItemsNumber = state.cartItems.length;
    },
    removeFromCart: (state, action: PayloadAction<Item>) => {
      const { id } = action.payload;
      const index = state.cartItems.findIndex((item: Item) => item.id === id);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
        state.cartItemsNumber = state.cartItems.length;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItemsNumber;

export default cartSlice.reducer;
