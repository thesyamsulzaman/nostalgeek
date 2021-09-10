const Joi = require('joi');

const InvitationPayloadSchema = Joi.object({
  title: Joi.string().required().min(10),
  body: Joi.string().required().min(20),
});

const InvitationImageSchema = Joi.object({
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

module.exports = { InvitationPayloadSchema, InvitationImageSchema };
