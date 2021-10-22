import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './lib/history';

import Home from './pages/Home';
import GroupChat from './pages/GroupChat';

import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Profile from './pages/user/Profile';
import EditForm from './pages/user/EditProfile';

import SidebarWrapper from './containers/SidebarWrapper';

import CreateInvitation from './pages/invitations/CreateInvitation';
import EditInvitation from './pages/invitations/EditInvitation';
import DeleteInvitation from './pages/invitations/DeleteInvitation';
import ShowInvitation from './pages/invitations/ShowInvitation';

import PrivateRoute from './utils/PrivateRoute';
import store from './store';
import { getUserInfo } from './store/actions/user';

class App extends Component {
  componentDidMount() {
    store.dispatch(getUserInfo());
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <SidebarWrapper>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/user/register" component={Register} />

            <PrivateRoute exact path="/chat/:query" component={GroupChat} />
            <PrivateRoute exact path="/user/profile" component={Profile} />
            <PrivateRoute
              exact
              path="/user/profile/:id/edit"
              component={EditForm}
            />

            <PrivateRoute
              exact
              path="/invitations/create"
              component={CreateInvitation}
            />

            <Route exact path="/invitations/:id" component={ShowInvitation} />

            <PrivateRoute
              exact
              path="/invitations/:id/edit"
              component={EditInvitation}
            />
            <PrivateRoute
              exact
              path="/invitations/:id/delete"
              component={DeleteInvitation}
            />
          </SidebarWrapper>
        </Switch>
      </Router>
    );
  }
}

export default App;
