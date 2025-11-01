import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const initialState = {
  sessionUid: uuidv4(),
  productSize: null,
  productColors: null,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductSize: (state, action) => { state.productSize = action.payload },
    setProductColors: (state, action) => { state.productColors = action.payload },
  },

});

export const { setProductSize, setProductColors } = productSlice.actions;
export default productSlice.reducer;
