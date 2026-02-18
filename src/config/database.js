const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://madanmohan:madanmadar333@cluster0.guwzahs.mongodb.net/fenmoWebApp"
    )
}

module.exports=connectDB;