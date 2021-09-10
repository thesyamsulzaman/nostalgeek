import React from "react";
import { Container, Menu, Icon } from "semantic-ui-react";

function Header({ onToggle }) {
  return (
    <Container>
      <Menu color="violet" inverted size="small">
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Item position="right">
          <Icon name="search" />
        </Menu.Item>
      </Menu>
    </Container>
  );
}

export default Header;
