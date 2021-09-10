import {
  LOADING_INVITATION,
  LOADING_INVITATIONS,
  SET_INVITATIONS,
  GET_INVITATION,
  CREATE_INVITATION,
  DELETE_INVITATION,
  EDIT_INVITATION,
  LIKE_INVITATION,
  UNLIKE_INVITATION,
  ADD_COMMENT_INVITATION,
  REMOVE_COMMENT_INVITATION,
} from "../constants/invitations";

import { _mapKeys, _omit } from "../../utils/objectsMapper";

const initialState = {
  data: {},
  loading: false,
};

const invitationsReducer = (invitations = initialState, action) => {
  switch (action.type) {
    case LOADING_INVITATIONS:
      return { ...invitations, loading: true };

    case SET_INVITATIONS:
      return { data: { ..._mapKeys(action.payload, "id") }, loading: false };

    case CREATE_INVITATION:
      return {
        ...invitations,
        data: { ...invitations.data, [action.payload.id]: action.payload },
      };

    case DELETE_INVITATION:
      return {
        ...invitations,
        data: _omit(invitations.data, action.payload.id),
      };

    case LIKE_INVITATION:
    case UNLIKE_INVITATION:
      return {
        ...invitations,
        data: {
          ...invitations.data,
          [action.payload.id]: action.payload,
        },
      };

    default:
      return invitations;
  }
};

export default invitationsReducer;
