import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Image } from 'semantic-ui-react';

import { getInvitation, editInvitation } from '../../store/actions/invitations';
import InvitationForm from './InvitationForm';

class EditInvitation extends Component {
  componentDidMount() {
    this.props.getInvitation(this.props.match.params.id);
  }

  onSubmit = (values) => {
    const { title, body, image } = values;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('body', body);

    if (!!image) {
      formData.append('image', image[0], image[0].name);
      formData.append('oldImageName', this.props.invitation.image);
    }

    this.props.editInvitation(this.props.match.params.id, formData);
  };

  render() {
    const { imageUrl, title, body } = this.props.invitation;

    return (
      <Container style={{ minHeight: '100vh', padding: '1em 0' }}>
        <Header as="h1">Edit Invitation</Header>
        <Link to="/user/profile">Back to Profile</Link>
        <div>
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
        </div>

        <InvitationForm
          onSubmit={this.onSubmit}
          loading={this.props.loading}
          initialValues={{ title, body }}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.ui.loading,
  invitation: state.user.invitations[ownProps.match.params.id],
});

const mapActionsToProps = {
  editInvitation,
  getInvitation,
};
export default connect(mapStateToProps, mapActionsToProps)(EditInvitation);
