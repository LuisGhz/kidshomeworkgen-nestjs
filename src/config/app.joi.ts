import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().default('development'),
  OPENAI_API_KEY: Joi.string().required(),
  PDF_API_URI: Joi.string().required(),
});
