import { verifyToken as jwtVerifyToken } from "../utils/token.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { isTokenBlacklisted } from "../utils/tokenBlackListed.js";

export async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return ResponseHandler.fail(res, 'No token provided');
    }
  
    const token = authHeader.split(' ')[1]; // Bearer <token>
  
    const blacklisted = await isTokenBlacklisted(token);
    console.log('Token is blacklisted:', blacklisted);
    if (blacklisted) {
      return ResponseHandler.fail(res, 'Token has been invalidatedddddd', {}, 401);
    }
  
    const decoded = jwtVerifyToken(token);
    if (!decoded) {
      return ResponseHandler.fail(res, 'Invalid or expired token');
    }
  
    req.user = decoded;
    res.locals.token = "Bearer " + token;
    next();
  }
  