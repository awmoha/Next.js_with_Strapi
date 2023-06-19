import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "interfaces/interfaces";

const initialState: AuthState = {
  email: "",
  password: "",
  error: "",
  firstTwoLetters: "",
  user: null,
  isLoggedIn: false,
  isNewAccount: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.firstTwoLetters = action.payload.substr(0, 2).toUpperCase(); // Uppdatera firstTwoLetters när e-postadressen ändras
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setNewAccount: (state, action: PayloadAction<boolean>) => {
      state.isNewAccount = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload ? action.payload.uid || action.payload.email : null;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    clearForm: (state) => {
      state.email = "";
      state.password = "";
    },
  },
});

export const {
  setEmail,
  setPassword,
  setError,
  setIsLoggedIn,
  setUser,
  setNewAccount,
  clearForm,
} = authSlice.actions;

export default authSlice.reducer;
