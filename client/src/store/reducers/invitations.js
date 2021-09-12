import {
  LOADING_INVITATIONS,
  SET_INVITATIONS,
  CREATE_INVITATION,
  DELETE_INVITATION,
  LIKE_INVITATION,
  UNLIKE_INVITATION,
  SET_INVITATION,
  EDIT_INVITATION,
  GET_INVITATION,
  ADD_COMMENT,
  REMOVE_COMMENT,
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

    case DELETE_INVITATION:
      return {
        ...invitations,
        data: _omit(invitations.data, action.payload.id),
      };

    case GET_INVITATION:
    case EDIT_INVITATION:
    case SET_INVITATION:
    case CREATE_INVITATION:
      return {
        ...invitations,
        data: { ...invitations.data, [action.payload.id]: action.payload },
      };

    case ADD_COMMENT:
    case REMOVE_COMMENT:
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
