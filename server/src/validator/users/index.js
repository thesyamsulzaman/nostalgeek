const InvariantError = require('../../exceptions/InvariantError');
const { UserPayloadSchema, ProfilePictureSchema } = require('./schema');

const UsersValidator = {
  validateUserPayload: (payload) => {
    const validationResult = UserPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateProfilePictureHeaders: (headers) => {
    const validationResult = ProfilePictureSchema.validate(headers);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = UsersValidator;
