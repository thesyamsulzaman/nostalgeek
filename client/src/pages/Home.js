import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SidebarWrapper from "../containers/SidebarWrapper";
import InvitationCard from "../components/InvitationCard";
import { getAllInvitations } from "../store/actions/invitations";

class Home extends Component {
  componentDidMount() {
    this.props.getAllInvitations();
  }

  renderInvitations(invitations) {
    return invitations.map((invitation) => (
      <InvitationCard key={invitation.id} invitation={invitation} />
    ));
  }

  render() {
    const { invitations, loading } = this.props;
    return (
      <SidebarWrapper>
        <Container style={{ minHeight: "100vh", padding: "1em 0" }}>
          <Header as="h1">Current Invitations</Header>
          {loading ? <p>Loading ...</p> : this.renderInvitations(invitations)}
        </Container>
      </SidebarWrapper>
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
  loading: state.invitations.loading,
});

export default connect(mapStateToProps, { getAllInvitations })(Home);
