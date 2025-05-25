import express from "express";
import userRoutes from './routes/userRoutes.js';
import tweetRoutes from "./routes/tweetRoutes.js";
import ResponseHandler from './utils/ResponseHandler.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/user', userRoutes);
app.use('/tweet', tweetRoutes);

// 404 Not Found handler
app.use((req, res, next) => {
  return ResponseHandler.fail(res, 'Not Found', {}, 404);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  return ResponseHandler.error(res, err, 'Internal Server Error', 500);
});



export default app;