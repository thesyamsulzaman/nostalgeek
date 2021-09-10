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

    case LOADING_UI:
      return {
        ...ui,
        loading: true,
      };

    default:
      return ui;
  }
};

export default uiReducer;
