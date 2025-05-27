// Middlewares/authorizeUser.js
import ResponseHandler from '../utils/ResponseHandler.js';

export function authorizeUser(req, res, next) {
  const userIdFromToken = req.user.id; // From the token
  const userIdFromParams = parseInt(req.params.id); // From the URL

  if (userIdFromToken !== userIdFromParams) {
    return ResponseHandler.fail(res, 'Unauthorized access', {}, 403);
  }

  next();
}
