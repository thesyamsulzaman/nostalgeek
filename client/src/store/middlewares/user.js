import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_USER,
  GET_USER_SUCCESS,
  REGISTER,
  LOGIN_USER,
  REGISTER_USER,
  REGISTER_SUCCESS,
  LOGOUT_USER,
  SET_UNAUTHENTICATED,
  EDIT_USER,
  EDIT_USER_SUCCESS,
} from '../constants/user';
import { apiRequest } from '../actions/api';
import { updateUser, getUserInfo } from '../actions/user';
import history from '../../lib/history';
import { _mapKeys } from '../../utils/objectsMapper';

const userMiddleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    /**
     * Event Action
     **/

    if (action.type === LOGIN_USER) {
      const { email, password } = action.payload;
      dispatch(
        apiRequest({
          url: '/users/login',
          method: 'POST',
          body: { email, password },
          onSuccess: (user) => ({
            type: LOGIN_SUCCESS,
            payload: user.accessToken,
          }),
        })
      );
    }

    if (action.type === GET_USER) {
      dispatch(
        apiRequest({
          url: '/users/info',
          method: 'GET',
          onSuccess: ({ information, likes, comments, invitations }) => ({
            type: GET_USER_SUCCESS,
            payload: { information, likes, comments, invitations },
          }),
        })
      );
    }

    if (action.type === REGISTER_USER) {
      dispatch(
        apiRequest({
          url: '/users/register',
          method: 'POST',
          headers: {},
          body: action.payload,
          onSuccess: (response) => ({
            type: REGISTER_SUCCESS,
          }),
        })
      );
    }

    if (action.type === EDIT_USER) {
      dispatch(
        apiRequest({
          url: '/users/edit',
          method: 'PUT',
          headers: {},
          body: action.payload,
          onSuccess: (user) => ({
            type: EDIT_USER_SUCCESS,
            payload: user,
          }),
        })
      );
    }

    if (action.type === LOGOUT_USER) {
      localStorage.removeItem('accessToken');
      dispatch({ type: SET_UNAUTHENTICATED });
    }

    /**
     * Document Action
     */

    switch (action.type) {
      case LOGIN_SUCCESS:
        localStorage.setItem('accessToken', action.payload);
        dispatch(updateUser({ accessToken: action.payload }));
        dispatch(getUserInfo());

        history.push('/');
        break;

      case EDIT_USER_SUCCESS:
        dispatch(getUserInfo());
        history.push('/user/profile');

        break;

      case REGISTER_SUCCESS:
        history.push('/user/login');
        break;

      case GET_USER_SUCCESS:
        dispatch(
          updateUser({
            ...action.payload,
            invitations: { ..._mapKeys(action.payload.invitations, 'id') },
            likes: { ..._mapKeys(action.payload.likes, 'invitationId') },
            comments: { ..._mapKeys(action.payload.comments, 'id') },
          })
        );
        break;

      default:
        break;
    }
  };

export default userMiddleware;
