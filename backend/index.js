import express from "express";
import mongoose from "mongoose";
// import dotenv from 'dotenv';


  // dotenv.config();

mongoose.connect("mongodb+srv://fitsaleem:fitsaleem@cluster0.byc6obh.mongodb.net/fit?retryWrites=true")
.then(()=>{
    console.log("Database connected");
})
.catch((err)=>{
    console.log(err);
});




// setup express server
const app= express();






















app.listen(3000 , () => {
    console.log("Server is running on port 3000");

});

