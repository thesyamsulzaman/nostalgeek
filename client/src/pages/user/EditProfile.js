import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Container,
  Header,
  Image,
  Form,
  Button,
  Message,
} from "semantic-ui-react";

import { getUserInfo, editUserInfo } from "../../store/actions/user";

import SidebarWrapper from "../../containers/SidebarWrapper";

class EditProfile extends Component {
  state = {
    id: "",
    fullname: "",
    email: "",
    profile_picture: null,
    oldProfilePictureName: "",
    profilePictureUrl: "",
    errors: "",
  };

  componentDidMount() {
    this.props.getUserInfo();
    this.mapInformationToLocalState(this.props.information);
  }

  componentDidUpdate(prevProps) {
    if (this.props.ui.errors !== prevProps.ui.errors) {
      this.setState({ errors: this.props.ui.errors });
    }
  }

  mapInformationToLocalState = ({
    id,
    fullname,
    email,
    profilePicture,
    profilePictureUrl,
  }) => {
    this.setState((prevState) => ({
      id,
      fullname,
      email,
      oldProfilePictureName: profilePicture,
      profilePictureUrl,
    }));
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const { fullname, email, profile_picture, oldProfilePictureName } =
      this.state;

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);

    if (profile_picture) {
      formData.append("profile_picture", profile_picture, profile_picture.name);
      formData.append("oldProfilePictureName", oldProfilePictureName);
    }

    this.props.editUserInfo(formData, this.props.history);
  };

  onFieldChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileUploadChangeHandler = (e) => {
    this.setState({ profile_picture: e.target.files[0] });
  };

  render() {
    const { fullname, email, profilePictureUrl, errors } = this.state;
    const { loading } = this.props.ui;

    return (
      <SidebarWrapper>
        <Container style={{ minHeight: "100vh", padding: "2em 0" }}>
          <Image src={profilePictureUrl} size="small" />
          <Header as="h1">Edit Profile Page</Header>

          <Form error onSubmit={this.onSubmitHandler}>
            {errors && (
              <Message error header="Edit Profile failed" content={errors} />
            )}

            <Form.Field>
              <label>Fullname * </label>
              <input
                name="fullname"
                placeholder="Fullname"
                type="text"
                autoComplete="off"
                value={fullname}
                onChange={this.onFieldChangeHandler}
              />
            </Form.Field>

            <Form.Field>
              <label>Email * </label>
              <input
                name="email"
                placeholder="Email"
                type="email"
                autoComplete="off"
                value={email}
                onChange={this.onFieldChangeHandler}
              />
            </Form.Field>

            <Form.Field>
              <label>Profile Picture </label>
              <input
                name="profile_picture"
                type="file"
                onChange={this.onFileUploadChangeHandler}
              />
            </Form.Field>

            <Button
              type="submit"
              color="violet"
              style={{ width: "100%" }}
              size="medium"
              loading={loading}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </SidebarWrapper>
    );
  }
}

EditProfile.propTypes = {
  information: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  information: state.user.information,
  loading: state.user.loading,
  ui: state.ui,
});

const mapActionsToProps = {
  getUserInfo,
  editUserInfo,
};

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
