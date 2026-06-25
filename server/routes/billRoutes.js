const express = require("express");
const router = express.Router();

const Bill =
  require("../models/Bill");

router.post(
  "/save",
  async (req, res) => {
    try {
      const bill =
        await Bill.create(
          req.body
        );

      res.json({
        success: true,
        billId: bill._id,
      });
    } catch (error) {
      res.json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

router.get("/:id", async (req, res) => {
  try {

    console.log("Invoice ID:", req.params.id);

    const bill = await Bill.findById(
      req.params.id
    );

    console.log("Bill Found:", bill);

    if (!bill) {
      return res.json({
        success: false,
        message: "Bill Not Found",
      });
    }

    res.json({
      success: true,
      bill,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }
});

module.exports = router;