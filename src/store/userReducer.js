import { GET_USER_DATA, ADD_CART_ITEM, SET_USER_DATA, SET_CART_ITEMS } from "../redux/actionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  cartItems: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    // case USER_FETCH_START:
    //   return { ...state, loading: true };

    case SET_USER_DATA:
      return { ...state, loading: false, user: action.payload };

    case SET_CART_ITEMS:
      return { ...state, loading: false, cartItems: action.payload };

    // case USER_FETCH_ERROR:
    //   return { ...state, loading: false, error: action.payload, user: null };

    default:
      return state;
  }
}
