const express=require("express");
const router=express.Router();
const {createExpense,getExpense,deleteExpense}= require("../controllers/expenseController");


router.post("/",createExpense);
router.get("/",getExpense);
router.delete("/:id",deleteExpense);

module.exports=router;