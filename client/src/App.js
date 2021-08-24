import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";

import SidebarWrapper from "./containers/SidebarWrapper";

class App extends Component {
  state = {};

  render() {
    return (
      <SidebarWrapper>
        <Container style={{ minHeight: "100vh", padding: "2em 0" }}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            mollitia minus explicabo, doloribus a sapiente reprehenderit
            obcaecati sequi distinctio itaque accusantium deleniti perferendis
            facilis porro officia, omnis ad error illum.
          </p>
        </Container>
      </SidebarWrapper>
    );
  }
}

export default App;
