/* eslint-disable prettier/prettier */
import * as Joi from 'joi';
// Joi validation schema for environment variables help us to validate the environment variables
export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3000),
});
