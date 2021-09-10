import React from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../store/actions/user";

function SidebarMenu({ isOpened, onSidebarHide, authenticated, logout }) {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      inverted
      onHide={onSidebarHide}
      vertical
      visible={isOpened}
    >
      <Menu.Item as="a" style={{ fontSize: "1.5rem", textAlign: "center" }}>
        NostalGeek
      </Menu.Item>

      <Menu.Item as={NavLink} exact to="/">
        Home
      </Menu.Item>

      <Menu.Item>
        <hr style={{ margin: ".5em 0" }} />
      </Menu.Item>

      {authenticated ? (
        <React.Fragment>
          <Menu.Item as={NavLink} to="/user/profile">
            Profile
          </Menu.Item>
          <Menu.Item as="a" onClick={() => logout()}>
            Logout
          </Menu.Item>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Menu.Item as={NavLink} to="/user/login">
            Login
          </Menu.Item>

          <Menu.Item as={NavLink} to="/user/register">
            Register
          </Menu.Item>
        </React.Fragment>
      )}
    </Sidebar>
  );
}

SidebarMenu.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { logout })(SidebarMenu);
