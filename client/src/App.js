import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import EditForm from "./pages/user/EditProfile";

import CreateInvitation from "./pages/invitations/CreateInvitation";
import EditInvitation from "./pages/invitations/EditInvitation";
import DeleteInvitation from "./pages/invitations/DeleteInvitation";
import ShowInvitation from "./pages/invitations/ShowInvitation";

import PrivateRoute from "./utils/PrivateRoute";
import store from "./store";
import { loadUser } from "./store/actions/user";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/invitations/:id" exact component={ShowInvitation} />

          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/register" component={Register} />
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
        </Switch>
      </Router>
    );
  }
}

export default App;
