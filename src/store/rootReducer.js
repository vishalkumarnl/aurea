import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productSlice"

const rootReducer = combineReducers({
    product: productReducer,
});

export default rootReducer;