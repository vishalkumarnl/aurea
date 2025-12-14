import {
  GET_USER_DATA,
  ADD_CART_ITEM,
  SET_USER_DATA,
  LOGIN_USER,
  LOGOUT_USER,
  GET_CART_ITEMS,
  SET_CART_ITEMS,
  ADD_LOCAL_TO_REMOTE_CART,
} from "./actionTypes";

const buildBody = (payload) => {
  return {
    ...payload,
  };
};

const apiConfig = {
  //   timeout: 10000,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  [LOGIN_USER]: {
    buildRequest: (action) => {
      return {
        path: `/auth/login`,
        method: "POST",
        body: buildBody(action.payload),
      };
    },
    successHandler: (response, action) => {
      const { addLocalCartToRemoteCart } = action.payload;
      if (addLocalCartToRemoteCart) {
        addLocalCartToRemoteCart();
      }
      return [
        {
          type: SET_USER_DATA,
          payload: response?.data?.user,
        },
        {
          type: GET_CART_ITEMS
        }
      ];
    },
    failureHandler: (action) => {
      return [];
    },
  },
  [LOGOUT_USER]: {
    buildRequest: (action) => {
      return {
        path: `/auth/logout`,
        method: "POST",
      };
    },
    successHandler: (response, action) => {
      return [
        {
          type: SET_USER_DATA,
          payload: null,
        },
        {
          type: SET_CART_ITEMS,
          payload: [],
        }
      ];
    },
    failureHandler: (action) => {
      return [];
    },
  },
  [GET_USER_DATA]: {
    buildRequest: (action) => {
      return {
        path: `/user/profile`,
        method: "GET",
      };
    },
    successHandler: (response, action) => {
      return [
        {
          type: SET_USER_DATA,
          payload: response?.data?.user,
        },
        {
          type: GET_CART_ITEMS
        }
      ];
    },
    failureHandler: (action) => {
      return [];
    },
  },
  [GET_CART_ITEMS]: {
    buildRequest: (action) => {
      return {
        path: `/cart/getCarts`,
        method: "GET",
      };
    },
    successHandler: (response, action) => {
      return [
        {
          type: SET_CART_ITEMS,
          payload: response?.data?.items,
        },
      ];
    },
    failureHandler: (action) => {
      return [];
    },
  },
  [ADD_LOCAL_TO_REMOTE_CART]: {
    buildRequest: (action) => {
      return {
        path: `/cart/addLocalToRemoteCart`,
        method: "POST",
        body: buildBody(action.payload),
      };
    },
    successHandler: (response, action) => {
      return [
        {
          type: GET_CART_ITEMS
        }
      ];
    },
    failureHandler: (action) => {
      return [];
    },
  },
  [ADD_CART_ITEM]: {
    buildRequest: (action) => {
      return {
        path: `/cart/add`,
        method: "POST",
        body: buildBody(action.payload),
      };
    },
    successHandler: (response, action) => {
      return {
        type: "CART_ITEM_ADDED",
        payload: response.data,
      };
    },
    failureHandler: (action) => {
      return [];
    },
  },
};

export default apiConfig;
