import React, { Component } from 'react';
import { Container, Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteInvitation } from '../../store/actions/invitations';

class DeleteInvitation extends Component {
  state = { open: true };

  onDeleteInvitationHandler = (e) => {
    this.props.deleteInvitation(this.props.match.params.id);
  };

  render() {
    const { open } = this.state;

    return (
      <Container style={{ minHeight: '100vh', padding: '1em 0' }}>
        <Modal
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={open}
          size="mini"
        >
          <Modal.Header>Are you sure ?</Modal.Header>
          <Modal.Actions>
            <Button color="black" as={Link} to="/user/profile">
              Cancel
            </Button>
            <Button
              content="Yes"
              onClick={this.onDeleteInvitationHandler}
              color="red"
              loading={this.props.loading}
            />
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.user.loading,
    invitation: state.user.invitations[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { deleteInvitation })(DeleteInvitation);
