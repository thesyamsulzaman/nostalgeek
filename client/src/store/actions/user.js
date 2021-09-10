import {
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
} from "../constants/user";

import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../constants/ui";

const BASE_URL = "http://localhost:5000/users";

export const tokenConfig = (getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json:charset=utf8",
    },
  };

  const token = getState().user.accessToken;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const loadUser = () => async (dispatch) => {
  dispatch(getUserInfo());
};

export const getUserInfo = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_USER });

    const response = await fetch(`${BASE_URL}/info`, tokenConfig(getState));

    const jsonResponse = await response.json();

    if (jsonResponse.status === "success") {
      const { information, likes, invitations } = jsonResponse.data;
      dispatch({
        type: SET_USER,
        payload: {
          information,
          likes,
          invitations,
        },
      });
    } else {
      dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
      dispatch(logout());
    }
  } catch (error) {
    console.error(error);
  }
};

export const login =
  ({ email, password }, history) =>
  async (dispatch) => {
    dispatch({ type: LOADING_UI });

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const jsonResponse = await response.json();

      if (jsonResponse.status === "success") {
        const { accessToken } = jsonResponse.data;
        localStorage.setItem("accessToken", accessToken);

        dispatch({ type: CLEAR_ERRORS });

        dispatch({
          type: SET_USER,
          payload: { accessToken },
        });

        dispatch(getUserInfo());

        history.push("/");
      } else {
        dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const register = (user, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: user,
    });

    const jsonResponse = await response.json();

    if (jsonResponse.status === "success") {
      dispatch({ type: CLEAR_ERRORS });
      history.push("/user/login");
    } else {
      dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("accessToken");
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const editUserInfo = (user, history) => async (dispatch, getState) => {
  dispatch({ type: LOADING_UI });
  const { headers } = tokenConfig(getState);

  delete headers["Content-Type"];

  const response = await fetch(`${BASE_URL}/edit`, {
    method: "PUT",
    headers: headers,
    body: user,
  });

  const jsonResponse = await response.json();

  if (jsonResponse.status === "success") {
    dispatch({ type: CLEAR_ERRORS });
    history.push(`/user/profile`);
  } else {
    dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
  }
};
