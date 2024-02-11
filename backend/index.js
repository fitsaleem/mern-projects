import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from "./routes/user.routes.js";


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




// create routes

app.use("/api/user", userRoutes);















const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log("Server is running on port 3000");

});

