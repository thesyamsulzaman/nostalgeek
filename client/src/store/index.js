import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';

import apiMiddleware from './middlewares/api';
import invitationsMiddleware from './middlewares/invitations';
import userMiddleware from './middlewares/user';

import ui from './reducers/ui';
import invitations from './reducers/invitations';
import user from './reducers/user';

dotenv.config();

const reducers = combineReducers({
  ui,
  user,
  invitations,
});

export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(apiMiddleware, userMiddleware, invitationsMiddleware, thunk)
  )
);
