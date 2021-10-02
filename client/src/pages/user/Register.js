import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';

import { register } from '../../store/actions/user';

class Register extends Component {
  state = {
    fullname: '',
    email: '',
    password: '',
    confirm_password: '',
    profile_picture: null,
    errors: '',
  };

  componentDidUpdate(prevProps) {
    if (this.props.ui.errors !== prevProps.ui.errors) {
      this.setState({ errors: this.props.ui.errors });
    }
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    const { fullname, email, password, confirm_password, profile_picture } =
      this.state;

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirm_password);

    if (profile_picture) {
      formData.append('profile_picture', profile_picture, profile_picture.name);
    }

    this.props.register(formData, this.props.history);
  };

  onFieldChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileUploadChangeHandler = (e) => {
    this.setState({ profile_picture: e.target.files[0] });
  };

  render() {
    const { email, password, confirm_password, fullname, errors } = this.state;
    const { loading } = this.props.ui;
    const { authenticated } = this.props;

    if (authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Container style={{ minHeight: '100vh', padding: '2em 0' }}>
        <Header as="h1">Register Page</Header>

        <Form error onSubmit={this.onSubmitHandler}>
          {errors && <Message error header="Login failed" content={errors} />}

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
            <label>Password * </label>
            <input
              name="password"
              placeholder="****"
              type="password"
              autoComplete="off"
              value={password}
              onChange={this.onFieldChangeHandler}
            />
          </Form.Field>

          <Form.Field>
            <label>Confirm Password * </label>
            <input
              name="confirm_password"
              placeholder="****"
              type="password"
              autoComplete="off"
              value={confirm_password}
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
            style={{ width: '100%' }}
            size="medium"
            loading={loading}
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  ui: state.ui,
});

const mapActionsToProps = {
  register,
};

export default connect(mapStateToProps, mapActionsToProps)(Register);
