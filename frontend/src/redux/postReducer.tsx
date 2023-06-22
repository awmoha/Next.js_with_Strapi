import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PostState {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const initialState: PostState = {
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },
    resetPost: (state) => {
      state.name = "";
      state.description = "";
      state.price = 0;
      state.imageUrl = "";
    },
  },
});
export const { setName, setDescription, setPrice, setImage, resetPost } =
  postSlice.actions;

export default postSlice.reducer;
