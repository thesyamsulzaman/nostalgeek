import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS } from "../constants/ui";

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === "API") {
      const {
        url,
        onSuccess,
        onAfterSuccess,
        onFailure,
        onError,
        method = "GET",
        headers = {},
        body = {},
      } = action.payload;

      dispatch({ type: LOADING_UI });

      fetch(process.env.BASE_URL + url, {
        method,
        body,
        headers,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            dispatch(onSuccess(res.data));
            dispatch({ type: CLEAR_ERRORS });

            dispatch(onAfterSuccess);
          } else {
            dispatch(onFailure(res.message));
            dispatch({ type: SET_ERRORS, payload: res.message });
          }
        })
        .catch((error) => {
          dispatch({ type: SET_ERRORS, payload: "Server failed to run" });
          dispatch(onError(error));
        });
      return;
    }
  };

export default apiMiddleware;
