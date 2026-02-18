const Expense = require("../models/expense");
const { v4: uuidv4 } = require("uuid");

const createExpense = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;

        if (!amount || amount < 0 || !category || !date) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const idempotencyKey =
            req.header("Idempotency-Key") || uuidv4();

        const existing = await Expense.findOne({ idempotencyKey });

        if (existing) {
            return res.status(200).json(existing);
        }

        const expense = await Expense.create({
            amount,
            category,
            description,
            date,
            idempotencyKey
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Error creating expense" });
    }
};

const getExpense = async (req, res) => {
    try {
        const { category, sort } = req.query;

        let query = {};

        if (category) {
            query.category = category;
        }

        let expensesQuery = Expense.find(query);

        if (sort === "date_desc") {
            expensesQuery = expensesQuery.sort({ date: -1 });
        }

        const expenses = await expensesQuery;

        const total = expenses.reduce(
            (sum, e) => sum + parseFloat(e.amount.toString()),
            0
        );

        res.json({
            total,
            count: expenses.length,
            data: expenses
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching expenses" });
    }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
      data: deletedExpense
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting expense"
    });
  }
};


module.exports={createExpense,getExpense,deleteExpense};