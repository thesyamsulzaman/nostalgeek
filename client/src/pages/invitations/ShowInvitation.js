import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Header,
  Image,
  Comment,
  Form,
  Button,
} from "semantic-ui-react";

import SidebarWrapper from "../../containers/SidebarWrapper";
import { getInvitation } from "../../store/actions/invitations";
import LikeButton from "../../components/LikeButton";

export class ShowInvitation extends Component {
  componentDidMount() {
    this.props.getInvitation(this.props.match.params.id);
  }

  render() {
    const { id, imageUrl, title, body, likeCount, commentCount } =
      this.props.invitation;

    return (
      <SidebarWrapper>
        <Container style={{ minHeight: "100vh", padding: "1em 0" }}>
          <div>
            <Header as="h1">Invitation</Header>
            <Link to="/">Back to Home</Link>
          </div>

          <Image
            src={imageUrl}
            size="medium"
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              margin: "1em 0",
            }}
          />

          <Header as="h2">{title} </Header>
          <p>{body}</p>

          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ marginRight: ".5em" }}>
              <LikeButton key={id} likeCount={likeCount} invitationId={id} />
            </div>
          </div>

          <Comment.Group>
            <Header as="h3" dividing>
              Comments ({commentCount})
            </Header>

            <Comment>
              <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Matt</Comment.Author>

                <Comment.Text>How artistic!</Comment.Text>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Joe Henderson</Comment.Author>

                <Comment.Text>
                  Dude, this is awesome. Thanks so much
                </Comment.Text>
              </Comment.Content>
            </Comment>

            <Form reply>
              <Form.TextArea />
              <Button
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
              />
            </Form>
          </Comment.Group>
        </Container>
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  invitation: state.invitations.data[ownProps.match.params.id],
});

const mapActionsToProps = {
  getInvitation,
};

export default connect(mapStateToProps, mapActionsToProps)(ShowInvitation);
