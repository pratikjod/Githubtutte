const Bill = require("../models/Bill");

// CREATE BILL
const createBill = async (req, res) => {
  try {
    console.log(req.body);

    const bill = await Bill.create({
      customerName:
        req.body.customerName,

      phone: req.body.phone,

      items: req.body.items,

      totalAmount:
        req.body.totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Bill Saved",
      bill,
    });
  } catch (error) {
    console.log(
      "CREATE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL BILLS
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find({});

    res.status(200).json({
      success: true,
      bills,
    });
  } catch (error) {
    console.log(
      "GET ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBill,
  getBills,
};