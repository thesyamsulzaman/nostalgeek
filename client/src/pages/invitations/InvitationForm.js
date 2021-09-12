import React, { Component } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Message, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

class InvitationForm extends Component {
  render() {
    const { initialValues = {}, onSubmit, loading } = this.props;

    return (
      <FinalForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form error onSubmit={handleSubmit}>
            <Field
              name="title"
              validate={composeValidators(
                required("Title"),
                minLength("Title", 10),
                maxLength("Title", 100)
              )}
            >
              {({ input, meta }) => (
                <Form.Field>
                  <label htmlFor="">Title *</label>
                  <input {...input} type="text" placeholder="Title" />
                  {meta.error && meta.touched && (
                    <Message error content={meta.error} />
                  )}
                </Form.Field>
              )}
            </Field>
            <Field
              name="body"
              validate={composeValidators(
                required("Body"),
                minLength("Body", 20)
              )}
            >
              {({ input, meta }) => (
                <Form.Field>
                  <label htmlFor="">Body *</label>
                  <textarea {...input}></textarea>
                  {meta.error && meta.touched && (
                    <Message error content={meta.error} />
                  )}
                </Form.Field>
              )}
            </Field>

            <Field name="image">
              {({ input: { value, onChange, ...input }, meta }) => (
                <Form.Field>
                  <label>Image </label>
                  <input
                    {...input}
                    name="image"
                    type="file"
                    onChange={({ target }) => onChange(target.files)}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </Form.Field>
              )}
            </Field>

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
        )}
      />
    );
  }
}

InvitationForm.propTypes = {
  initialState: PropTypes.object,
};

const required = (field) => (value) =>
  value ? undefined : `${field} is Required`;

const minLength = (field, min) => (value) =>
  value.trim().length >= min
    ? undefined
    : `${field} should be greater than ${min}`;

const maxLength = (field, max) => (value) =>
  value.trim().length <= max
    ? undefined
    : `${field} should be less than ${max}`;

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export default InvitationForm;
