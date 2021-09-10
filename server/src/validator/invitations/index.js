const InvariantError = require('../../exceptions/InvariantError');
const { InvitationPayloadSchema, InvitationImageSchema } = require('./schema');

const InvitationsValidator = {
  validateInvitationPayload: ({ title, body }) => {
    const validationResult = InvitationPayloadSchema.validate({ title, body });
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateInvitationImageHeaders: (headers) => {
    const validationResult = InvitationImageSchema.validate(headers);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = InvitationsValidator;
