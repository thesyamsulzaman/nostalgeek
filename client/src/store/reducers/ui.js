import { API_START, API_FINISH } from "../constants/api";
import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../constants/ui";

const initialState = {
  loading: false,
  errors: null,
};

const uiReducer = (ui = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...ui,
        loading: false,
        errors: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...ui,
        loading: false,
        errors: null,
      };

    case API_START:
    case LOADING_UI:
      return {
        ...ui,
        loading: true,
      };

    case API_FINISH:
      return {
        ...ui,
        loading: false,
      };

    default:
      return ui;
  }
};

export default uiReducer;
