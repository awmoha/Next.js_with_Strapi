import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appConfig } from "./config";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Item } from "../interfaces/interfaces";

const createAxios = () => {
  const params = {
    baseURL: appConfig.apiURL,
  };
  return axios.create(params);
};
// export const fetchData = createAsyncThunk("data/fetchData", async () => {
//   try {
//     const response = await createAxios().get("api/products?populate=*");
//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch data from Strapi");
//   }
// });

export const fetchDataFromFirebase = createAsyncThunk(
  "data/fetchDataFromFirebase",
  async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "posts"));
      const firebaseData: Item[] = querySnapshot.docs.map((doc) =>
        doc.data() as Item
      );
      return firebaseData;
    } catch (error) {
      throw new Error("Failed to fetch data from Firebase");
    }
  }
);

