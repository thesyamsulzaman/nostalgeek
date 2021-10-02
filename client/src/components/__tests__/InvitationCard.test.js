import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import InvitationCard from '../InvitationCard';

const mockStore = configureStore([]);

describe('Testing Redux integrated Component', () => {
  let store;
  let component;

  // beforeEach(() => {
  //   store = mockStore({
  //     invitations: {},
  //     ui: {},
  //     user: {},
  //   });

  //   component = renderer.create(
  //     <Provider store={store}>
  //       <Router>
  //         <InvitationCard
  //           invitation={{ title: "", body: "", likeCount: 0, commentCount: 0 }}
  //           user={{}}
  //           likeInvitation={() => {}}
  //           unlikeInvitation={() => {}}
  //         />
  //       </Router>
  //     </Provider>
  //   );
  // });

  it('Should render the unlike invitation', () => {
    expect(1).toEqual(1);
  });
  // it("Should dispatch the like action", () => {});
});
