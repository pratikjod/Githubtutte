const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  items: Array,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.model(
    "Bill",
    billSchema
  );