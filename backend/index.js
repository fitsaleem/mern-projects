import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";


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
app.use("/api/auth", authRoutes);















const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log("Server is running on port 3000");

});

