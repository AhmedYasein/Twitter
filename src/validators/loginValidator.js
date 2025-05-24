import { body } from 'express-validator';

const loginValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Email is invalid'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export default loginValidationRules;
