import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavState, Item } from "interfaces/interfaces";
import { RootState } from "./store";

const initialState: FavState = {
  FavItems: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Item>) => {
      state.FavItems.push(action.payload);
    },
    removeFromFavourites: (state, action: PayloadAction<Item>) => {
      const { id } = action.payload;
      const index = state.FavItems.findIndex((item: Item) => item.id === id);
      if (index !== -1) {
        state.FavItems.splice(index, 1);
      }
    },

    setFavItems: (state, action: PayloadAction<Item[]>) => {
      state.FavItems = action.payload;
    },
  },
});

export const { setFavItems, addToFavourites, removeFromFavourites } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
