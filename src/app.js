require("dotenv").config();
const express=require("express");
const app=express();
const port=process.env.PORT || 5000;
const connectDB=require("./config/database");
const expenseRouter=require("./routes/expenseRoutes");
const cors=require("cors");
app.use(express.json());

app.use("/expenses",expenseRouter);

app.use(
  cors({
    origin: [
                    // local frontend
      "https://expensecheckerfrontend.vercel.app/"      // deployed frontend
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
  })
);

connectDB().then(()=>{
   console.log("database connected");
   app.listen(port,()=>{
    console.log("server started successfully");
   })
}).catch(()=>{
   console.log("database cannot be connected");
})