import React, { Component } from "react";
import { Sidebar, Segment } from "semantic-ui-react";

import NavBarMenu from "../components/NavbarMenu";
import SidebarMenu from "../components/SidebarMenu";

class SidebarWrapper extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  componentWillUnmount() {
    this.setState({});
  }

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
            style={{ padding: ".8em 0em" }}
            vertical
          >
            <NavBarMenu onToggle={this.handleToggle} />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default SidebarWrapper;
