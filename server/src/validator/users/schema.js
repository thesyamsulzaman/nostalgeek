const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  profile_picture: Joi.object().required()
});

const ProfilePictureSchema = Joi.object({
  'content-type': Joi.string()
    .valid(
      'image/apng',
      'image/avif',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp'
    )
    .required()
}).unknown();

module.exports = { UserPayloadSchema, ProfilePictureSchema };
