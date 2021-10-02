import {
  INVITATIONS_LOADED,
  CREATE_INVITATION,
  DELETE_INVITATION,
  LIKE_INVITATION,
  UNLIKE_INVITATION,
  INVITATION_LOADED,
  EDIT_INVITATION,
  GET_INVITATION,
  ADD_COMMENT,
  REMOVE_COMMENT,
  LOADING_INVITATION_SHOW,
  LOADING_INVITATIONS_HIDE,
  LOADING_INVITATION_HIDE,
  LOADING_INVITATIONS_SHOW,
  FETCH_INVITATIONS_FAILED,
  UPDATE_INVITATION,
  UPDATE_INVITATIONS,
} from '../constants/invitations';

import { _mapKeys, _omit } from '../../utils/objectsMapper';

const initialState = {
  data: {},
  loading: false,
};

const invitationsReducer = (invitations = initialState, action) => {
  switch (action.type) {
    case LOADING_INVITATIONS_SHOW:
    case LOADING_INVITATION_SHOW:
      return {
        ...invitations,
        data: { ...invitations.data, ...action.payload },
        loading: true,
      };

    case LOADING_INVITATIONS_HIDE:
    case LOADING_INVITATION_HIDE:
    case FETCH_INVITATIONS_FAILED:
    case UPDATE_INVITATIONS:
      return {
        ...invitations,
        data: { ...invitations.data, ...action.payload },
        loading: false,
      };

    case UPDATE_INVITATION:
      return {
        ...invitations,
        data: {
          ...invitations.data,
          [action.payload.id]: {
            ...invitations.data[action.payload.id],
            ...action.payload,
          },
        },
      };

    case ADD_COMMENT: {
      const { invitationId } = action.payload;
      const selectedInvitation = invitations.data[invitationId];

      return {
        ...invitations,
        data: {
          ...invitations.data,
          [invitationId]: {
            ...selectedInvitation,
            commentCount: selectedInvitation.commentCount + 1,
            comments: [...selectedInvitation.comments, action.payload],
          },
        },
      };
    }

    case REMOVE_COMMENT: {
      const { id: commentId, invitationId } = action.payload;
      const selectedInvitation = invitations.data[invitationId];

      return {
        ...invitations,
        data: {
          ...invitations.data,
          [invitationId]: {
            ...selectedInvitation,
            commentCount: selectedInvitation.commentCount - 1,
            comments: selectedInvitation.comments.filter(
              (comment) => comment.id !== commentId
            ),
          },
        },
      };
    }

    case LIKE_INVITATION:
    case UNLIKE_INVITATION:
      return {
        ...invitations,
        data: {
          ...invitations.data,
          [action.payload.id]: {
            ...invitations.data[action.payload.id],
            ...action.payload,
          },
        },
      };

    case INVITATIONS_LOADED:
      return { data: { ..._mapKeys(action.payload, 'id') }, loading: false };

    case DELETE_INVITATION:
      return {
        ...invitations,
        data: _omit(invitations.data, action.payload),
      };

    default:
      return invitations;
  }
};

export default invitationsReducer;
