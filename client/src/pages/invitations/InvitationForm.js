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
            <Field name="title" validate={required}>
              {({ input, meta }) => (
                <Form.Field>
                  <label htmlFor="">Title *</label>
                  <input {...input} type="text" placeholder="First Name" />
                  {meta.error && meta.touched && (
                    <Message error content={meta.error} />
                  )}
                </Form.Field>
              )}
            </Field>
            <Field name="body" validate={required}>
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

const required = (value) => (value ? undefined : "Required");

const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);

const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export default InvitationForm;
