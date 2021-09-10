const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === "API") {
      const { url, onSuccess, onFailure, onError } = action.payload;

      fetch(process.env.BASE_URL + url)
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "success") {
            dispatch(onSuccess(response.data));
          } else {
            dispatch(onFailure(response.message));
          }
        })
        .catch((error) => dispatch(onError(error)));
      return;
    }
  };

export default apiMiddleware;
