import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { likeInvitation, unlikeInvitation } from "../store/actions/invitations";

class LikeButton extends Component {
  likedInvitation = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.invitationId === this.props.invitationId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeInvitation = () => {
    this.props.likeInvitation(this.props.invitationId);
  };

  unlikeInvitation = () => {
    this.props.unlikeInvitation(this.props.invitationId);
  };

  render() {
    const { likeCount, authenticated, loading } = this.props;

    const likeButton = !authenticated ? (
      <Button as={Link} to="user/login">
        <Icon name="thumbs up outline" />
        Like
      </Button>
    ) : this.likedInvitation() ? (
      <Button onClick={this.unlikeInvitation} loading={loading}>
        <Icon name="thumbs up" />
        Unlike
      </Button>
    ) : (
      <Button onClick={this.likeInvitation} loading={loading}>
        <Icon name="thumbs up outline" />
        Like
      </Button>
    );

    return (
      <Button as="div" labelPosition="left">
        <Label as="a" basic pointing="right">
          {likeCount}
        </Label>
        {likeButton}
      </Button>
    );
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  invitationId: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated,
  loading: state.ui.loading,
});

const mapActionsToProps = {
  likeInvitation,
  unlikeInvitation,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
