import {
  GET_INVITATIONS,
  FETCH_INVITATIONS_SUCCESS,
  FETCH_INVITATIONS_FAILED,
  FETCH_INVITATION_SUCCESS,
  FETCH_INVITATION_FAILED,
  GET_INVITATION,
  CREATE_INVITATION,
  EDIT_INVITATION,
  DELETE_INVITATION,
  CREATE_INVITATION_SUCCESS,
  CREATE_INVITATION_FAILED,
  EDIT_INVITATION_SUCCESS,
  EDIT_INVITATION_FAILED,
  DELETE_INVITATION_SUCCESS,
  DELETE_INVITATION_FAILED,
  HIT_LIKE,
  HIT_UNLIKE,
  UNLIKE_INVITATION_SUCCESS,
  UNLIKE_INVITATION_FAILED,
  LIKE_INVITATION_SUCCESS,
  LIKE_INVITATION_FAILED,
  LIKE_INVITATION,
  UNLIKE_INVITATION,
  HIT_DELETE,
  ADDING_COMMENT,
  ADDING_COMMENT_SUCCESS,
  ADDING_COMMENT_FAILED,
  ADD_COMMENT,
  REMOVING_COMMENT,
  REMOVING_COMMENT_SUCCESS,
  REMOVING_COMMENT_FAILED,
  REMOVE_COMMENT,
} from '../constants/invitations';

import { apiRequest } from '../actions/api';
import { updateInvitation, updateInvitations } from '../actions/invitations';
import { _mapKeys } from '../../utils/objectsMapper';
import history from '../../lib/history';

const invitationsMiddleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    /**
     * Event Action
     **/

    if (action.type === GET_INVITATIONS) {
      dispatch(
        apiRequest({
          url: '/invitations',
          method: 'GET',
          onSuccess: (invitations) => ({
            type: FETCH_INVITATIONS_SUCCESS,
            payload: invitations,
          }),
          onError: (error) => ({
            type: FETCH_INVITATIONS_FAILED,
          }),
        })
      );
    }

    if (action.type === GET_INVITATION) {
      dispatch(
        apiRequest({
          url: `/invitations/${action.payload}`,
          method: 'GET',
          onSuccess: (invitation) => ({
            type: FETCH_INVITATION_SUCCESS,
            payload: invitation,
          }),
          onError: (error) => ({
            type: FETCH_INVITATION_FAILED,
          }),
        })
      );
    }

    if (action.type === CREATE_INVITATION) {
      dispatch(
        apiRequest({
          url: '/invitations',
          method: 'POST',
          headers: {},
          body: action.payload,
          onSuccess: (invitation) => ({
            type: CREATE_INVITATION_SUCCESS,
            payload: invitation,
          }),
          onError: (error) => ({
            type: CREATE_INVITATION_FAILED,
          }),
        })
      );
    }

    if (action.type === EDIT_INVITATION) {
      const { id, invitation } = action.payload;

      dispatch(
        apiRequest({
          url: `/invitations/${id}`,
          method: 'PUT',
          headers: {},
          body: invitation,
          onSuccess: (invitation) => ({
            type: EDIT_INVITATION_SUCCESS,
            payload: invitation,
          }),
          onError: (error) => ({
            type: EDIT_INVITATION_FAILED,
          }),
        })
      );
    }

    if (action.type === HIT_DELETE) {
      dispatch(
        apiRequest({
          url: `/invitations/${action.payload}`,
          method: 'DELETE',
          headers: {},
          onSuccess: (invitation) => ({
            type: DELETE_INVITATION_SUCCESS,
            payload: invitation.id,
          }),
          onError: (error) => ({
            type: DELETE_INVITATION_FAILED,
          }),
        })
      );
    }

    if (action.type === HIT_LIKE) {
      dispatch(
        apiRequest({
          url: `/invitations/${action.payload}/like-invitation`,
          method: 'POST',
          headers: {},
          onSuccess: (invitation) => ({
            type: LIKE_INVITATION_SUCCESS,
            payload: invitation,
          }),
          onError: (error) => ({
            type: LIKE_INVITATION_FAILED,
          }),
        })
      );
    }

    if (action.type === HIT_UNLIKE) {
      dispatch(
        apiRequest({
          url: `/invitations/${action.payload}/unlike-invitation`,
          method: 'DELETE',
          headers: {},
          onSuccess: (invitation) => ({
            type: UNLIKE_INVITATION_SUCCESS,
            payload: invitation,
          }),
          onError: (error) => ({
            type: UNLIKE_INVITATION_FAILED,
          }),
        })
      );
    }

    if (action.type === ADDING_COMMENT) {
      const { invitationId: id, body } = action.payload;

      dispatch(
        apiRequest({
          url: `/invitations/${id}/comments`,
          method: 'POST',
          body: { body },
          onSuccess: (invitation) => ({
            type: ADDING_COMMENT_SUCCESS,
            payload: invitation,
          }),
          onError: (error) => ({
            type: ADDING_COMMENT_FAILED,
          }),
        })
      );
    }

    if (action.type === REMOVING_COMMENT) {
      const { invitationId, commentId } = action.payload;

      dispatch(
        apiRequest({
          url: `/invitations/${invitationId}/comments/${commentId}`,
          method: 'DELETE',
          onSuccess: (invitation) => ({
            type: REMOVING_COMMENT_SUCCESS,
            payload: invitation,
          }),
          onError: (error) => ({
            type: REMOVING_COMMENT_FAILED,
          }),
        })
      );
    }

    /**
     * Document Action
     */

    switch (action.type) {
      case FETCH_INVITATIONS_SUCCESS:
        dispatch(updateInvitations({ ..._mapKeys(action.payload, 'id') }));
        break;

      case FETCH_INVITATION_SUCCESS:
        dispatch(updateInvitation(action.payload));
        break;

      case LIKE_INVITATION_SUCCESS:
        dispatch({ type: LIKE_INVITATION, payload: action.payload });
        break;

      case UNLIKE_INVITATION_SUCCESS:
        dispatch({ type: UNLIKE_INVITATION, payload: action.payload });
        break;

      case ADDING_COMMENT_SUCCESS:
        dispatch({ type: ADD_COMMENT, payload: action.payload });
        break;

      case REMOVING_COMMENT_SUCCESS:
        dispatch({ type: REMOVE_COMMENT, payload: action.payload });
        break;

      case CREATE_INVITATION_SUCCESS:
      case EDIT_INVITATION_SUCCESS:
        dispatch(updateInvitation(action.payload));
        history.push('/user/profile');
        break;

      case DELETE_INVITATION_SUCCESS:
        dispatch({ type: DELETE_INVITATION, payload: action.payload });
        history.push('/user/profile');
        break;

      default:
        break;
    }
  };

export default invitationsMiddleware;
