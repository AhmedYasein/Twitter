// userRoutes.js
import express from 'express';
import ResponseHandler from '../utils/ResponseHandler.js';

const router = express.Router();

// Create user
router.post('/', (req, res) => {
  return ResponseHandler.fail(res, "user not found");
});


// Lsit user
router.get('/', (req, res) => {
    return ResponseHandler.fail(res, "user not found");
  });

  // Get one user
router.get('/:id', (req, res) => {
    const id = req.params.id
    return ResponseHandler.fail(res, `user not found ${id}`);
  });

   // Update user
   router.put('/:id', (req, res) => {
    const id = req.params.id
    return ResponseHandler.fail(res, `user not found ${id}`);
  });

  // Delete user
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    return ResponseHandler.fail(res, `user not found ${id}`);
  });


export default router;
