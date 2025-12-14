import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productSlice"
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    product: productReducer,
    userData: userReducer,
});

export default rootReducer;