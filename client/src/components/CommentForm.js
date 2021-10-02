import React, { Component } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Message, Button } from 'semantic-ui-react';

class CommentForm extends Component {
  render() {
    const { initialValues = {}, onSubmit, loading } = this.props;

    return (
      <FinalForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <Form
            error
            onSubmit={(event) => {
              handleSubmit().then(() => form.reset());
            }}
            style={{ marginTop: '1em' }}
          >
            <Field name="body" validate={composeValidators(required('Body'))}>
              {({ input, meta }) => (
                <Form.Field>
                  <textarea {...input}></textarea>
                  {meta.error && meta.touched && (
                    <Message error content={meta.error} />
                  )}
                </Form.Field>
              )}
            </Field>

            <Button
              type="submit"
              content="Add Reply"
              color="violet"
              size="medium"
              loading={loading}
              labelPosition="left"
              icon="edit"
            />
          </Form>
        )}
      />
    );
  }
}

const required = (field) => (value) =>
  value ? undefined : `${field} is Required`;

const minLength = (field, min) => (value) =>
  value.trim().length >= min
    ? undefined
    : `${field} should be greater than ${min}`;

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export default CommentForm;
