import {
  INVITATIONS_LOADED,
  INVITATION_LOADED,
  CREATE_INVITATION,
  DELETE_INVITATION,
  EDIT_INVITATION,
  LIKE_INVITATION,
  UNLIKE_INVITATION,
  LOADING_INVITATIONS_SHOW,
  LOADING_INVITATION_SHOW,
  GET_INVITATIONS,
  GET_INVITATION,
  UPDATE_INVITATION,
  UPDATE_INVITATIONS,
  HIT_LIKE,
  HIT_UNLIKE,
  HIT_DELETE,
  ADDING_COMMENT,
  REMOVING_COMMENT,
} from '../constants/invitations';

export const getAllInvitations = () => ({
  type: GET_INVITATIONS,
});

export const getInvitation = (id) => ({
  type: GET_INVITATION,
  payload: id,
});

export const createInvitation = (invitation) => ({
  type: CREATE_INVITATION,
  payload: invitation,
});

export const editInvitation = (id, invitation) => ({
  type: EDIT_INVITATION,
  payload: { id, invitation },
});

export const deleteInvitation = (id) => ({
  type: HIT_DELETE,
  payload: id,
});

export const likeInvitation = (id) => ({
  type: HIT_LIKE,
  payload: id,
});

export const unlikeInvitation = (id) => ({
  type: HIT_UNLIKE,
  payload: id,
});

export const addComment = (invitationId, body) => ({
  type: ADDING_COMMENT,
  payload: { invitationId, body },
});

export const removeComment = (invitationId, commentId) => ({
  type: REMOVING_COMMENT,
  payload: { invitationId, commentId },
});

export const updateInvitation = (invitation) => ({
  type: UPDATE_INVITATION,
  payload: invitation,
});

export const updateInvitations = (invitations) => ({
  type: UPDATE_INVITATIONS,
  payload: invitations,
});
