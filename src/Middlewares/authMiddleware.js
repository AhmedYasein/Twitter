import { verifyToken as jwtVerifyToken } from "../utils/token.js"

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Assuming format: "Bearer <token>"

  const decoded = jwtVerifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded; 
  next();
}
