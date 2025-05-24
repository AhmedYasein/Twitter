import express from 'express';
import { validationResult } from 'express-validator';
import ResponseHandler from '../utils/ResponseHandler.js';
import UserController from '../../Controllers/userController.js'; 
import userValidationRules from '../../validators/userValidator.js';

const router = express.Router();

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHandler.fail(
      res,
      'Validation failed',
      { errors: errors.array().map(error => error.msg) },
      400
    );
      }
  next();
};

// Create user with validation
router.post('/', userValidationRules, validate, UserController.create);

// List users (no validation needed)
router.get('/', UserController.list);

// Get one user (no validation on id here, but you can add if you want)
router.get('/:id', UserController.getOne);

// Update user with validation
router.put('/:id', userValidationRules, validate, UserController.update);

// Delete user (no validation needed for now)
router.delete('/:id', UserController.remove);

export default router;
