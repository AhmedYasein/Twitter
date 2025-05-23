// userRoutes.js
import express from 'express';
import ResponseHandler from '../utils/ResponseHandler.js';

const router = express.Router();

// Tweet user
router.post('/', (req, res) => {
  return ResponseHandler.fail(res, "user not found");
});


// Tweet user
router.get('/', (req, res) => {
    return ResponseHandler.fail(res, "user not found");
  });

  // Tweet one user
router.get('/:id', (req, res) => {
    const id = req.params.id
    return ResponseHandler.fail(res, `user not found ${id}`);
  });

   // Tweet user
   router.put('/:id', (req, res) => {
    const id = req.params.id
    return ResponseHandler.fail(res, `user not found ${id}`);
  });

  // Tweet user
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    return ResponseHandler.fail(res, `user not found ${id}`);
  });


export default router;
