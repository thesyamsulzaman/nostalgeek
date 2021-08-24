import React from "react";
import { Menu, Sidebar } from "semantic-ui-react";

function SidebarMenu({ isOpened, onSidebarHide }) {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      inverted
      onHide={onSidebarHide}
      vertical
      visible={isOpened}
    >
      <Menu.Item as="a" active>
        Home
      </Menu.Item>
      <Menu.Item as="a">Work</Menu.Item>
      <Menu.Item as="a">Company</Menu.Item>
      <Menu.Item as="a">Careers</Menu.Item>
      <Menu.Item as="a">Log in</Menu.Item>
      <Menu.Item as="a">Sign Up</Menu.Item>
    </Sidebar>
  );
}

export default SidebarMenu;
