import React, { Component } from "react";
import { Header, Sidebar, Segment, Container } from "semantic-ui-react";

import NavBarMenu from "../../components/NavbarMenu";
import SidebarMenu from "../../components/SidebarMenu";

class SidebarWrapper extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { sidebarOpened } = this.state;
    const { children } = this.props;

    return (
      <Sidebar.Pushable>
        <SidebarMenu
          isOpened={sidebarOpened}
          onSidebarHide={this.handleSidebarHide}
        />

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            color="violet"
            inverted
            style={{ padding: "1em 0em" }}
            vertical
          >
            <NavBarMenu onToggle={this.handleToggle} />

            <Segment
              vertical
              inverted
              color="violet"
              style={{ padding: "3em 1em" }}
            >
              <Container>
                <Header size="huge" inverted as="h1">
                  Hi, User
                </Header>
                <p>Wanna know what people have been up to these days ?</p>
              </Container>
            </Segment>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default SidebarWrapper;
