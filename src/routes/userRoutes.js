import express from 'express';
import { validationResult } from 'express-validator';
import ResponseHandler from '../utils/ResponseHandler.js';
import UserController from '../Controllers/userController.js'; 
import userValidationRules from '../validators/userValidator.js';
import loginValidationRules from '../validators/loginValidator.js';
import { verifyToken } from '../Middlewares/authMiddleware.js'
import { authorizeUser } from '../Middlewares/authorizeUser.js';
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

router.post('/login', loginValidationRules, validate, UserController.login);

// Create user with validation
router.post('/', userValidationRules, validate, UserController.create);

router.use(verifyToken);


// List users (no validation needed)
router.get('/', UserController.list);

// Logout
router.post('/logout', UserController.logout);


// Get one user (no validation on id here, but you can add if you want)

router.use(authorizeUser)
router.get('/:id', UserController.getOne);

// Update user with validation
router.put('/:id', userValidationRules, validate, UserController.update);

// Delete user (no validation needed for now)
router.delete('/:id', UserController.remove);



export default router;
