import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS } from '../constants/ui';
import { API_FINISH, API_REQUEST, API_START } from '../constants/api';

import { logout } from '../actions/user';

const api =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    const validateBody = (body) => {
      let bodyPayload;

      if (body instanceof Object) {
        bodyPayload = JSON.stringify(body);
      }

      if (body instanceof FormData) {
        bodyPayload = body;
      }

      return bodyPayload;
    };

    if (action.type === API_REQUEST) {
      const {
        method = 'GET',
        url,
        headers = {
          'Content-Type': 'application/json',
        },
        body = null,
        onSuccess,
        onFailure,
        onError,
      } = action.payload;

      const { accessToken } = getState().user;
      const validatedBody = validateBody(body);
      const defaultHeaders = {
        ...headers,
      };

      if (accessToken) {
        Object.assign(defaultHeaders, {
          Authorization: `Bearer ${accessToken}`,
        });
      }

      if (!headers.hasOwnProperty('Content-Type')) {
        delete defaultHeaders['Content-Type'];
      }

      dispatch({ type: API_START });

      fetch('http://localhost:5000' + url, {
        method,
        headers: { ...defaultHeaders },
        body: validatedBody,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 'success') {
            dispatch(onSuccess(res.data));
            dispatch({ type: API_FINISH });
          } else {
            dispatch({ type: SET_ERRORS, payload: res.message });

            if (onFailure) {
              dispatch(onFailure(res.message));
            }

            if (res.statusCode === 401) {
              dispatch(logout());
            }
          }
        })
        .catch((error) => {
          dispatch({ type: SET_ERRORS, payload: 'Server error' });

          console.error(error);

          if (onError) {
            dispatch(onError(error.message));
          }
        });
    }
  };

export default api;
