import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Icon, Button, Label, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { likeInvitation, unlikeInvitation } from "../store/actions/invitations";

class InvitationCard extends Component {
  likedInvitation = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.invitationId === this.props.invitation.id
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeInvitation = () => {
    this.props.likeInvitation(this.props.invitation.id);
  };

  unlikeInvitation = () => {
    this.props.unlikeInvitation(this.props.invitation.id);
  };

  render() {
    const {
      invitation: { title, body, likeCount, commentCount, imageUrl },
      authenticated,
      loading,
      actions = null,
    } = this.props;

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
      <Card style={{ width: "100%" }}>
        <Image
          src={imageUrl}
          size="medium"
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>{body}</Card.Description>
        </Card.Content>

        <Card.Content style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ marginRight: ".5em" }}>
              <Button as="div" labelPosition="left">
                <Label as="a" basic pointing="right">
                  {likeCount}
                </Label>
                {likeButton}
              </Button>
            </div>

            <div>
              {commentCount} <Icon name="chat" />
            </div>
          </div>

          {actions}
        </Card.Content>
      </Card>
    );
  }
}

InvitationCard.propTypes = {
  invitation: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
  }),
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  likeInvitation: PropTypes.func.isRequired,
  unlikeInvitation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, mapActionsToProps)(InvitationCard);
