import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Image, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { getUserInfo } from '../../store/actions/user';

import InvitationCard from '../../components/InvitationCard';

class Profile extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  renderProfileLayout = ({ id, fullName, profilePictureUrl }, invitations) => {
    return (
      <React.Fragment>
        <Container style={{ minHeight: '100%', padding: '1em 0' }}>
          <div className={{ display: 'flex' }}>
            <Image
              src={profilePictureUrl}
              avatar
              style={{ marginRight: '.5em' }}
            />
            <span style={{ marginRight: '.5em' }}>
              Hi, {fullName.split(' ')[0]}
            </span>
            &bull;
            <Link
              to={`/user/profile/${id}/edit`}
              className={{ marginLeft: '.5em' }}
            >
              Edit Profile
            </Link>
          </div>
        </Container>
        <Container style={{ minHeight: '100vh', padding: '1em 0' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Header as="h2">Your Invitations</Header>
            <Button as={Link} to={`/invitations/create`} color="green">
              <Icon name="plus" />
              Create Invitation
            </Button>
          </div>

          {invitations.length < 1 && <p>You havent written any invitations</p>}

          {invitations.map((invitation) => (
            <InvitationCard
              invitation={invitation}
              key={invitation.id}
              actions={
                <div>
                  <Button
                    as={Link}
                    to={`/invitations/${invitation.id}/edit`}
                    primary
                  >
                    Edit
                  </Button>
                  <Button
                    as={Link}
                    to={`/invitations/${invitation.id}/delete`}
                    color="red"
                  >
                    Delete
                  </Button>
                </div>
              }
            />
          ))}
        </Container>
      </React.Fragment>
    );
  };

  render() {
    const { information, invitations, loading } = this.props;

    return (
      <Container>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          this.renderProfileLayout(information, invitations)
        )}
      </Container>
    );
  }
}

Profile.propTypes = {
  information: PropTypes.object.isRequired,
  invitations: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  information: state.user.information,
  invitations: Object.values(state.user.invitations),
  loading: state.user.loading,
});

const mapActionsToProps = {
  getUserInfo,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
