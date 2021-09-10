const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirm_password: Joi.string().equal(Joi.ref('password')),
});

const UserProfilePayloadSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
});

const ProfilePictureSchema = Joi.object({
  'content-type': Joi.string()
    .valid(
      'image/apng',
      'image/avif',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp',
      'svg'
    )
    .required()
}).unknown();

module.exports = { UserPayloadSchema, UserProfilePayloadSchema, ProfilePictureSchema };
