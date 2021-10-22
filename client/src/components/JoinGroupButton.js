/* eslint-disable react/require-render-return */
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class JoinGroupButton extends Component {
  state = {
    joined: false,
  };

  hasJoined = () => {
    return this.state.joined;
  };

  joinGroup = () => {
    console.log('clicked');
    this.setState({ joined: !this.state.joined });
  };

  render() {
    if (this.hasJoined()) {
      return (
        <Button
          onClick={this.joinGroup}
          color="green"
          style={{ opacity: '.5' }}
        >
          Joined
        </Button>
      );
    } else {
      return (
        <Button
          as={Link}
          to="/chat/blablac"
          onClick={this.joinGroup}
          color="green"
        >
          Join the group chat
        </Button>
      );
    }
  }
}

export default JoinGroupButton;
