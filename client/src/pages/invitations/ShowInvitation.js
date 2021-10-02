import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Image } from 'semantic-ui-react';

import CommentsContainer from '../../containers/CommentsContainer';

import { getInvitation } from '../../store/actions/invitations';
import LikeButton from '../../components/LikeButton';

export class ShowInvitation extends Component {
  componentDidMount() {
    this.props.getInvitation(this.props.match.params.id);
  }

  renderInviation = (invitation) => {
    const { id, imageUrl, title, body, likeCount, commentCount, comments } =
      invitation;

    return (
      <React.Fragment>
        <div>
          <Header as="h1">Invitation</Header>
          <Link to="/">Back to Home</Link>
        </div>

        <Image
          src={imageUrl}
          size="medium"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            margin: '1em 0',
          }}
        />

        <Header as="h2">{title} </Header>
        <p>{body}</p>

        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div style={{ marginRight: '.5em' }}>
            <LikeButton key={id} likeCount={likeCount} invitationId={id} />
          </div>
        </div>

        <CommentsContainer
          label={`Comments (${commentCount})`}
          comments={comments}
          invitationId={id}
        />
      </React.Fragment>
    );
  };

  render() {
    const { loading, invitation } = this.props;

    return (
      <Container style={{ minHeight: '100vh', padding: '1em 0' }}>
        {invitation && !loading ? (
          this.renderInviation(invitation)
        ) : (
          <p>Loading ...</p>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.ui.loading,
  invitation: state.invitations.data[ownProps.match.params.id],
});

const mapActionsToProps = {
  getInvitation,
};

export default connect(mapStateToProps, mapActionsToProps)(ShowInvitation);
