const express=require("express");
const app=express();
const port=5000;
const connectDB=require("./config/database");





connectDB().then(()=>{
   console.log("database connected");
   app.listen(port,()=>{
    console.log("server started successfully");
   })
}).catch(()=>{
   console.log("database cannot be connected");
})