import express from "express";
import userRoutes from './src/routes/userRoutes.js'; // 
import tweetRoutes from "./src/routes/tweetRoutes.js"
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/user', userRoutes)
app.use('/tweet', tweetRoutes)


app.get("/", (req , res) => {
  res.send("Hello from Express TypeScript app!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
