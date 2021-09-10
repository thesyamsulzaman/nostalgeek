const InvariantError = require('../../exceptions/InvariantError');
const { UserPayloadSchema, ProfilePictureSchema, UserProfilePayloadSchema } = require('./schema');

const UsersValidator = {
  validateUserPayload: ({
    fullname, email, password, confirm_password
  }) => {
    const validationResult = UserPayloadSchema.validate({
      fullname, email, password, confirm_password
    });

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateUserProfilePayload: ({ fullname, email }) => {
    const validationResult = UserProfilePayloadSchema.validate({
      fullname, email
    });

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
