import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import InvitationForm from './InvitationForm';

import { createInvitation } from '../../store/actions/invitations';

class CreateInvitation extends Component {
  onSubmit = async (values) => {
    const { title, body, image } = values;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('body', body);

    if (image) {
      formData.append('image', image[0], image[0].name);
    }

    this.props.createInvitation(formData);
  };

  render() {
    return (
      <Container style={{ minHeight: '100vh', padding: '1em 0' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Header as="h1">Create Invitation</Header>
          <Link to="/user/profile">Back to Profile</Link>
        </div>

        <InvitationForm onSubmit={this.onSubmit} loading={this.props.loading} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ loading: state.ui.loading });

export default connect(mapStateToProps, { createInvitation })(CreateInvitation);
