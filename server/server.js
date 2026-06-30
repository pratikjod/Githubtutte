const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Bill = require("./models/Bill");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fruit Juice API Running");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API working",
  });
});

app.post("/api/bills/save", async (req, res) => {
  try {
    const bill = await Bill.create(req.body);

    res.json({
      success: true,
      billId: bill._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/bills", async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      bills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/bills/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill Not Found",
      });
    }

    res.json({
      success: true,
      bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});