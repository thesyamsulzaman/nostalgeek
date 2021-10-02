import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';

import { login } from '../../store/actions/user';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.ui.errors !== prevProps.ui.errors) {
      this.setState({ errors: this.props.ui.errors });
    }
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    // this.props.login({ email, password }, this.props.history);
    this.props.login({ email, password });
  };

  onFieldChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, errors } = this.state;
    const { loading } = this.props.ui;
    const { authenticated } = this.props;

    if (authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Container style={{ minHeight: '100vh', padding: '2em 0' }}>
        <Header as="h1">Login Page</Header>

        <Form error onSubmit={this.onSubmitHandler}>
          {errors && <Message error header="Login failed" content={errors} />}

          <Form.Field>
            <label>Email </label>
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
            <label>Password </label>
            <input
              name="password"
              placeholder="****"
              type="password"
              autoComplete="off"
              value={password}
              onChange={this.onFieldChangeHandler}
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  ui: state.ui,
});

const mapActionsToProps = {
  login,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
