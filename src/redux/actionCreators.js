import { AnyAction, createAction } from "@reduxjs/toolkit";
import { GET_USER_DATA, ADD_CART_ITEM, LOGIN_USER , ADD_LOCAL_TO_REMOTE_CART, LOGOUT_USER} from "./actionTypes";
// import { store } from "./store";

export const getUserData = createAction(GET_USER_DATA, (payload) => {
  return {
    payload,
  };
});

export const loginUser = createAction(LOGIN_USER, (payload) => {
  return {
    payload,
  };
});

export const logoutUser = createAction(LOGOUT_USER, (payload) => {
  return {
    payload,
  };
});

export const addLocalToRemoteCart = createAction(ADD_LOCAL_TO_REMOTE_CART, (payload) => {
  return {
    payload,
  };
});



export const addCartItem = createAction(
  ADD_CART_ITEM,
  ({ productId, quantity }) => {
    // store.getStqate();
    return {
      payload: {
        productId,
        quantity,
      },
    };
  }
);
