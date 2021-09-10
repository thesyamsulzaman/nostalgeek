import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { Container, Header, Form, Message, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import SidebarWrapper from "../../containers/SidebarWrapper";
import InvitationForm from "./InvitationForm";

import { createInvitation } from "../../store/actions/invitations";

class CreateInvitation extends Component {
  onSubmit = async (values) => {
    const { title, body, image } = values;
    const formData = new FormData();

    formData.append("title", title);
    formData.append("body", body);

    if (image) {
      formData.append("image", image[0], image[0].name);
    }

    this.props.createInvitation(formData, this.props.history);
  };

  render() {
    return (
      <SidebarWrapper>
        <Container style={{ minHeight: "100vh", padding: "1em 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Header as="h1">Create Invitation</Header>
            <Link to="/user/profile">Back to Profile</Link>
          </div>

          <InvitationForm
            onSubmit={this.onSubmit}
            loading={this.props.loading}
          />
        </Container>
      </SidebarWrapper>
    );
  }
}

const mapStateToProps = (state) => ({ loading: state.ui.loading });

export default connect(mapStateToProps, { createInvitation })(CreateInvitation);
