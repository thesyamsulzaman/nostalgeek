import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import InvitationCard from '../components/InvitationCard';
import { getAllInvitations } from '../store/actions/invitations';

class Home extends Component {
  componentDidMount() {
    this.props.getAllInvitations();
  }

  renderInvitations(invitations) {
    return invitations.map((invitation) => (
      <InvitationCard
        key={invitation.id}
        invitation={invitation}
        actions={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link style={{ marginLeft: '.5em', fontSize: '1rem' }} to="/user">
              {invitation.userFullName}
            </Link>
          </div>
        }
      />
    ));
  }

  render() {
    const { invitations, loading, errors } = this.props;
    return (
      <Container style={{ minHeight: '100vh', padding: '1em 0' }}>
        <Header as="h1">Current Invitations</Header>
        {loading ? <p>Loading ...</p> : this.renderInvitations(invitations)}
        {errors && <p> {errors.message} </p>}
      </Container>
    );
  }
}

Home.propTypes = {
  invitations: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getAllInvitations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  invitations: Object.values(state.invitations.data),
  loading: state.ui.loading,
  errors: state.ui.errors,
});

export default connect(mapStateToProps, {
  getAllInvitations,
})(Home);
