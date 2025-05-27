import express from 'express';
import TweetController from '../Controllers/TweerController.js';
import tweetValidationRules from '../validators/tweetValidator.js';
import { validationResult } from 'express-validator';
import ResponseHandler from '../utils/ResponseHandler.js';
import { verifyToken } from '../Middlewares/authMiddleware.js';
const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHandler.fail(res, 'Validation failed', { errors: errors.array().map(e => e.msg) }, 400);
  }
  next();
};

router.use(verifyToken);

// Create tweet with validation
router.post('/', tweetValidationRules, validate, TweetController.create);

// List tweets (no validation)
router.get('/', TweetController.list);

// Get tweet by ID (optionally validate ID if needed)
router.get('/:id', TweetController.getOne);

// Update tweet with validation
router.put('/:id', tweetValidationRules, validate, TweetController.update);

// Delete tweet by ID
router.delete('/:id', TweetController.remove);

export default router;
