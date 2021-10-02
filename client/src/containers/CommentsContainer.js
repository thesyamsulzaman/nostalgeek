import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Comment } from 'semantic-ui-react';

import CommentForm from '../components/CommentForm';
import { addComment, removeComment } from '../store/actions/invitations';

class CommentsContainer extends Component {
  onSubmit = async (values) => {
    this.props.addComment(this.props.invitationId, values.body);
  };

  onDelete = (commentId) => {
    this.props.removeComment(this.props.invitationId, commentId);
  };

  isCommentOwner = (commentId) => {
    if (this.props.user.comments[commentId]) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { label, comments, authenticated } = this.props;

    return (
      <Comment.Group>
        <Header as="h3" dividing>
          {label}
        </Header>

        {comments.map(({ id, profilePictureUrl, fullName, body }) => (
          <Comment key={id}>
            <Comment.Avatar src={profilePictureUrl} />
            <Comment.Content>
              <Comment.Author as={Link} to="/user">
                {fullName}
              </Comment.Author>
              <Comment.Text>
                <p>{body}</p>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
                {this.isCommentOwner(id) && (
                  <Comment.Action
                    onClick={() => this.onDelete(id)}
                    style={{ color: 'red' }}
                  >
                    Remove
                  </Comment.Action>
                )}
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}

        {authenticated && (
          <CommentForm onSubmit={this.onSubmit} loading={this.props.loading} />
        )}
      </Comment.Group>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.ui.loading,
  authenticated: state.user.authenticated,
  user: state.user,
});

const mapDispatchToProps = { addComment, removeComment };

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
