import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../constants/user";

import {
  CREATE_INVITATION,
  DELETE_INVITATION,
  EDIT_INVITATION,
  LIKE_INVITATION,
  SET_INVITATION,
  UNLIKE_INVITATION,
} from "../constants/invitations";

import { _mapKeys, _omit } from "../../utils/objectsMapper";

const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  authenticated: false,
  information: {},
  likes: [],
  invitations: {},
  notifications: [],
  loading: false,
  errors: null,
};

const usersReducer = (user = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...user,
        ...action.payload,
        invitations: {
          ...user.invitations,
          ...(action.payload.invitations
            ? _mapKeys(action.payload.invitations, "id")
            : null),
        },
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
      return initialState;

    case LOADING_USER:
      return {
        ...user,
        loading: true,
      };

    case SET_INVITATION:
    case EDIT_INVITATION:
    case CREATE_INVITATION:
      return {
        ...user,
        invitations: {
          ...user.invitations,
          [action.payload.id]: action.payload,
        },
      };

    case DELETE_INVITATION:
      return {
        ...user,
        invitations: {
          ..._omit(user.invitations, action.payload.id),
        },
      };

    case LIKE_INVITATION:
      return {
        ...user,
        likes: [
          ...user.likes,
          {
            invitationId: action.payload.id,
            owner: user.information.id,
          },
        ],
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
        likes: user.likes.filter(
          (like) => like.invitationId !== action.payload.id
        ),
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
