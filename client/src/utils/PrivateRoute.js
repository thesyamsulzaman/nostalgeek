import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

function PrivateRoute({ component: Component, authenticated, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={(props) => {
        if (authenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/user/login" />;
        }
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, {})(PrivateRoute);
