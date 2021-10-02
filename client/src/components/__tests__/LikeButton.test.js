import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import LikeButton from '../LikeButton';
import {
  LIKE_INVITATION,
  UNLIKE_INVITATION,
} from '../../store/constants/invitations';

afterEach(cleanup);

it('renders with redux', () => {
  const { getByTestId, getByText } = renderWithRedux(
    <LikeButton key={1} likeCount={0} invitationId={'abc'} loading={false} />
  );
});

function reducer(
  state = { user: {}, authenticated: false, likeCount: 0, invitationId: '' },
  action
) {
  switch (action.type) {
    case LIKE_INVITATION:
      return { ...state };
    case UNLIKE_INVITATION:
      return { ...state };
    default:
      return state;
  }
}

function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}
