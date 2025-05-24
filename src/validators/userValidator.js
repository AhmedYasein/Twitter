import { body } from 'express-validator';

const userValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

body('userName')
  .notEmpty()
  .withMessage('Username is required')
  .isLength({ min: 3 })
  .withMessage('Username must be at least 3 characters')
  .matches(/^\S+$/)  // no spaces allowed, \S means non-whitespace characters
  .withMessage('Username must not contain spaces'),



  body('name')
    .notEmpty()
  . withMessage('name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),

  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),

  body('bio')
    .optional()
    .isString()
    .withMessage('Bio must be a string')
    .isLength({ max: 160 })
    .withMessage('Bio can be max 160 characters'),

  body('isVerified')
    .optional()
    .isBoolean()
    .withMessage('isVerified must be boolean'),
];

export default userValidationRules;
