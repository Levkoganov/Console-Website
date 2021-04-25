const joi = require('joi');

// FIRST SCHEMA (REGISTER)
const schemaAuth = joi.object({
  name: joi.string().min(5).max(15).required().messages({
    'string.min': 'Username is too weak',
    'string.max': 'Username must be less than 15 characters',
    'string.empty': 'Username is empty',
  }),
  email: joi.string().min(5).max(15).required().messages({
    'string.min': 'Email is too weak',
    'string.max': 'Email must be less than 15 characters',
    'string.empty': 'Email is empty',
  }),
  password: joi.string().min(6).max(15).required().messages({
    'string.min': 'Password is too weak',
    'string.max': 'Email must be less than 15 characters',
    'string.empty': 'Password is empty',
  }),
  // !!!BUG!!!
  confirm_password: joi
    .any()
    .valid(joi.ref('password'))
    .required()
    .options({
      messages: { any: { allowOnly: 'must match password' } },
    }),
});
// !!!BUG!!!

// INPUT VALIDATION
const validateInputAsync = (data) => {
  return schemaAuth.validateAsync(data, { abortEarly: false });
};

// SECOND SCHEMA(LOGIN)
const schemaAuthLogin = joi.object({
  email: joi.string().required().messages({
    'string.empty': 'Email is empty',
  }),
  password: joi.string().required().messages({
    'string.empty': 'Password is empty',
  }),
  checkbox: joi.allow(),
});

// INPUT VALIDATION
const validateInputLoginAsync = (data) => {
  return schemaAuthLogin.validateAsync(data, { abortEarly: false });
};

// THIRED SCHEMA(UPDATE)
const schemaAuthUpdate = joi.object({
  newname: joi.string().min(3).max(10).required().messages({
    'string.empty': 'New Username is empty',
    'string.min': 'New Username is too short',
    'string.max': 'New Username must be less than 10 characters',
  }),
});

// INPUT VALIDATION
const validateInputUpdateAsync = (data) => {
  return schemaAuthUpdate.validateAsync(data, { abortEarly: false });
};

module.exports.validateInputAsync = validateInputAsync;
module.exports.validateInputLoginAsync = validateInputLoginAsync;
module.exports.validateInputUpdateAsync = validateInputUpdateAsync;
