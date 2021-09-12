import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import LikeButton from "../components/LikeButton";

class InvitationCard extends Component {
  render() {
    const {
      invitation: { id, title, body, likeCount, commentCount, imageUrl },
      actions = null,
    } = this.props;

    return (
      <Card style={{ width: "100%" }}>
        <Image
          src={imageUrl}
          size="medium"
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
        <Card.Content>
          <Card.Header as={Link} to={`/invitations/${id}`}>
            {title}
          </Card.Header>
          <Card.Description>{body}</Card.Description>
        </Card.Content>

        <Card.Content style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ marginRight: ".5em" }}>
              <LikeButton key={id} likeCount={likeCount} invitationId={id} />
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
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.ui.loading,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(InvitationCard);
