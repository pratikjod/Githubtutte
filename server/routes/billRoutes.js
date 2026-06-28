const express = require("express");
const router = express.Router();

const Bill = require("../models/Bill");

// SAVE BILL
router.post("/save", async (req, res) => {
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

// GET ALL BILLS - History साठी
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find().sort({
      createdAt: -1,
    });

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

// GET SINGLE BILL - Invoice Page साठी
router.get("/:id", async (req, res) => {
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

module.exports = router;