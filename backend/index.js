import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comments.routes.js";

  dotenv.config();

  mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });




// setup express server
const app= express();


// Add  middleware

app.use(express.json());
app.use(cookieParser());


// Add routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use ("/api/comment", commentRoutes);

















const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log("Server is running on port 3000");

});

