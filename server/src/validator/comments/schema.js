const Joi = require('joi');

const CommentPayloadSchema = Joi.object({
  body: Joi.string().required(),
});

module.exports = { CommentPayloadSchema };
