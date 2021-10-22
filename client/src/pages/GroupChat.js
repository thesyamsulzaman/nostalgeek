import React, { Component } from 'react';
import {
  Container,
  Header,
  Form,
  Button,
  List,
  Label,
  Image,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class GroupChat extends Component {
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
          <Header as="h1">Sam's Group chat</Header>
          <Link to="/">Back to Home</Link>
        </div>

        <React.Fragment>
          <div
            style={{
              border: '1px solid #bbb',
              maxHeight: '400px',
              minHeight: '400px',
              width: '100%',
              marginBottom: '1em',
              overflowY: 'scroll',
              padding: '.5em',
            }}
          >
            <List divided selection>
              <List.Item>
                <Label color="black" horizontal>
                  Elliot
                </Label>
                Kumquats
              </List.Item>
              <List.Item>
                <Label color="black" horizontal>
                  Fruit
                </Label>
                Orange
              </List.Item>
              <List.Item>
                <Label color="black" horizontal>
                  Candy
                </Label>
                Ice Cream
              </List.Item>
              <List.Item>
                <Label horizontal>Dog</Label>
                Poodle
              </List.Item>
              <List.Item>
                <Label color="black" horizontal>
                  Elliot
                </Label>
                Kumquats
              </List.Item>
              <List.Item>
                <Label color="black" horizontal>
                  Candy
                </Label>
                Ice Cream
              </List.Item>
              <List.Item>
                <Label color="black" horizontal>
                  Fruit
                </Label>
                Orange
              </List.Item>
              <List.Item>
                <Label horizontal>Dog</Label>
                Poodle
              </List.Item>
              <List.Item>
                <Label color="black" horizontal>
                  Elliot
                </Label>
                Kumquats
              </List.Item>
              <List.Item>
                <Label color="black" horizontal>
                  Candy
                </Label>
                Ice Cream
              </List.Item>
              <List.Item>
                <Label color="black" horizontal>
                  Fruit
                </Label>
                Orange
              </List.Item>
              <List.Item>
                <Label horizontal>Dog</Label>
                Poodle
              </List.Item>
            </List>
          </div>

          <Form>
            <Form.Field>
              <input type="text" placeholder="Your message" />
            </Form.Field>
            <Form.Field>
              <Button
                type="submit"
                color="violet"
                style={{ width: '100%' }}
                size="medium"
              >
                Submit
              </Button>
            </Form.Field>
          </Form>
        </React.Fragment>
      </Container>
    );
  }
}

export default GroupChat;
