import apiConfig from "../../redux/apiConfig";
import api from "api/axios";

const mergedAPIConfig = {
  ...apiConfig,
};

const appendQueryParams = (url, params) => {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `${url}?${queryString}` : url;
};

export const apiCallMiddleware = (store) => (next) => async (action) => {
  const config = mergedAPIConfig[action.type];

  if (config) {
    next(action);
    const requestPayload = config.buildRequest(action, store);
    const method = requestPayload.method || "GET";
    const rootUrl = "http://localhost:8080";
    const url = rootUrl + requestPayload.path;
    try {
      const urlWithParams = appendQueryParams(url, requestPayload.params);
      let response;
      if (method === "GET") {
        response = await api.get(urlWithParams);
      } else if (method === "POST") {
        response = await api.post(urlWithParams, requestPayload.body);
      } else if (method === "PUT") {
        response = await api.put(urlWithParams, requestPayload.body);
      } else if (method === "DELETE") {
        response = await api.delete(urlWithParams);
      } else {
        throw new Error(`Unsupported HTTP method: ${method}`);
      }
      const successActions = config.successHandler(response, action, store);
      if (successActions?.length) {
        successActions.forEach((tempAction) => {
          store.dispatch(tempAction);
        });
      }
    } catch (error) {
      const failureAction = config.failureHandler(action, store);
      if (failureAction) {
        // store.dispatch(failureAction);
      }
    }
  } else {
    return next(action);
  }
};
