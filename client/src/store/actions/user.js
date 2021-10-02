import {
  EDIT_USER,
  GET_USER,
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER,
  LOADING_USER,
  USER_LOADED,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOGOUT_USER,
} from '../constants/user';

export const login = ({ email, password }) => ({
  type: LOGIN_USER,
  payload: { email, password },
});

export const register = (user) => ({
  type: REGISTER_USER,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT_USER,
});

export const editUserInfo = (user) => ({
  type: EDIT_USER,
  payload: user,
});

export const getUserInfo = () => ({
  type: GET_USER,
});

export const updateUser = (userInfo) => ({
  type: UPDATE_USER,
  payload: userInfo,
});
