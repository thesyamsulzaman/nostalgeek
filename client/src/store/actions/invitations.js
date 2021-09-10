import {
  LOADING_INVITATIONS,
  SET_INVITATIONS,
  SET_INVITATION,
  CREATE_INVITATION,
  DELETE_INVITATION,
  EDIT_INVITATION,
  LIKE_INVITATION,
  UNLIKE_INVITATION,
} from "../constants/invitations";
import { API } from "../constants/middlewares";
import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../constants/ui";

import { tokenConfig } from "./user";
const BASE_URL = "http://localhost:5000/invitations";

export const _getAllInvitations = () => ({
  type: API,
  payload: {
    url: `/invitations`,
    onSuccess: (invitations) => ({
      type: SET_INVITATIONS,
      payload: invitations,
    }),
    onFailure: (error) => ({ type: SET_ERRORS, payload: error.message }),
    onError: (error) => console.error(error),
  },
});

export const getAllInvitations = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_INVITATIONS });

    const response = await fetch(`${BASE_URL}`);
    const jsonResponse = await response.json();

    if (jsonResponse.status === "success") {
      dispatch({ type: SET_INVITATIONS, payload: jsonResponse.data });
    } else {
      dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getInvitation = (invitationId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });

    const response = await fetch(`${BASE_URL}/${invitationId}`);
    const jsonResponse = await response.json();

    if (jsonResponse.status === "success") {
      dispatch({ type: SET_INVITATION, payload: jsonResponse.data });
    } else {
      dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
    }
  } catch (error) {
    console.error(error);
  }
};

export const createInvitation =
  (invitation, history) => async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_UI });

      const { headers } = tokenConfig(getState);
      delete headers["Content-Type"];

      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers,
        body: invitation,
      });

      const jsonResponse = await response.json();

      if (jsonResponse.status === "success") {
        dispatch({ type: CREATE_INVITATION, payload: jsonResponse.data });
        dispatch({ type: CLEAR_ERRORS });

        history.push(`/user/profile`);
      } else {
        dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const deleteInvitation =
  (invitationId, history) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UI });

    try {
      const { headers } = tokenConfig(getState);
      delete headers["Content-Type"];

      const response = await fetch(`${BASE_URL}/${invitationId}`, {
        method: "DELETE",
        headers,
      });

      const jsonResponse = await response.json();

      if (jsonResponse.status === "success") {
        dispatch({ type: DELETE_INVITATION, payload: jsonResponse.data });
        dispatch({ type: CLEAR_ERRORS });

        history.push(`/user/profile`);
      } else {
        dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const editInvitation =
  (invitationId, invitation, history) => async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_UI });

      const { headers } = tokenConfig(getState);
      delete headers["Content-Type"];

      const response = await fetch(`${BASE_URL}/${invitationId}`, {
        method: "PUT",
        headers,
        body: invitation,
      });

      const jsonResponse = await response.json();

      if (jsonResponse.status === "success") {
        dispatch({ type: EDIT_INVITATION, payload: jsonResponse.data });
        dispatch({ type: CLEAR_ERRORS });

        history.push(`/user/profile`);
      } else {
        dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
      }
    } catch (error) {
      console.error(error);
    }
  };

export const likeInvitation = (invitationId) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_UI });

    const { headers } = tokenConfig(getState);
    delete headers["Content-Type"];

    const response = await fetch(
      `${BASE_URL}/${invitationId}/like-invitation`,
      {
        method: "POST",
        headers,
      }
    );
    const jsonResponse = await response.json();

    if (jsonResponse.status === "success") {
      dispatch({ type: LIKE_INVITATION, payload: jsonResponse.data });
      dispatch({ type: CLEAR_ERRORS });
    } else {
      dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
    }
  } catch (error) {
    console.error(error);
  }
};

export const unlikeInvitation =
  (invitationId) => async (dispatch, getState) => {
    dispatch({ type: LOADING_UI });

    try {
      const { headers } = tokenConfig(getState);
      delete headers["Content-Type"];

      const response = await fetch(
        `${BASE_URL}/${invitationId}/unlike-invitation`,
        {
          method: "DELETE",
          headers,
        }
      );

      const jsonResponse = await response.json();

      if (jsonResponse.status === "success") {
        dispatch({ type: UNLIKE_INVITATION, payload: jsonResponse.data });
        dispatch({ type: CLEAR_ERRORS });
      } else {
        dispatch({ type: SET_ERRORS, payload: jsonResponse.message });
      }
    } catch (error) {
      console.error(error);
    }
  };
