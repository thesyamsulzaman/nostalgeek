/* eslint-disable no-undef */
import {
  USER_LOADED,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  EDIT_USER,
  UPDATE_USER,
  LOGOUT_USER,
} from '../constants/user';

import {
  CREATE_INVITATION,
  DELETE_INVITATION,
  EDIT_INVITATION,
  LIKE_INVITATION,
  INVITATION_LOADED,
  UNLIKE_INVITATION,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../constants/invitations';

import { _mapKeys, _omit } from '../../utils/objectsMapper';

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  authenticated: false,
  information: {},
  likes: {},
  comments: {},
  invitations: {},
  notifications: [],
  loading: false,
  errors: null,
};

const usersReducer = (user = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
    case EDIT_USER:
      return {
        ...user,
        ...action.payload,
        authenticated: true,
        loading: false,
      };

    case SET_AUTHENTICATED:
      return {
        ...user,
        authenticated: true,
        loading: false,
      };

    case SET_UNAUTHENTICATED:
    case LOGOUT_USER:
      return initialState;

    case LOADING_USER:
      return {
        ...user,
        loading: true,
      };

    case CREATE_INVITATION:
    case EDIT_INVITATION:
      return {
        ...user,
        invitations: {
          ...user.invitations,
          ...(action.payload.owner === user.information.id && {
            [action.payload.id]: action.payload,
          }),
        },
      };

    case DELETE_INVITATION:
      return {
        ...user,
        invitations: {
          ..._omit(user.invitations, action.payload),
        },
      };

    case ADD_COMMENT:
      return {
        ...user,
        comments: {
          ...user.comments,
          [action.payload.id]: action.payload,
        },
      };

    case REMOVE_COMMENT:
      return {
        ...user,
        comments: _omit(user.comments, action.payload.id),
      };

    case LIKE_INVITATION:
      return {
        ...user,
        likes: {
          ...user.likes,
          [action.payload.id]: {
            invitationId: action.payload.id,
            owner: user.information.id,
          },
        },

        invitations: {
          ...user.invitations,
          ...(!!user.invitations[action.payload.id] && {
            [action.payload.id]: action.payload,
          }),
        },
      };

    case UNLIKE_INVITATION:
      return {
        ...user,
        likes: _omit(user.likes, action.payload.id),
        invitations: {
          ...user.invitations,
          ...(!!user.invitations[action.payload.id] && {
            [action.payload.id]: action.payload,
          }),
        },
      };

    default:
      return user;
  }
};

export default usersReducer;
