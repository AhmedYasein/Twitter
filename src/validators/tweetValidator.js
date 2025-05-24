// tweetValidator.js
import { body } from 'express-validator';

const tweetValidationRules = [
  body('content')
    .notEmpty()
    .withMessage('Tweet content is required')
    .isLength({ max: 280 })
    .withMessage('Tweet content can be max 280 characters'),
  // add more rules if needed
];

export default tweetValidationRules;
