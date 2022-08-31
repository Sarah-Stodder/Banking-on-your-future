const express = require("express");
const Saving = require("../models/Saving");
const router = express.Router();
const moment = require("moment");


router.post("/add-saving", async function (req, res) {
  try {
    const newsaving = new Saving(req.body);
    await newsaving.save();
    res.send("Savings added to your piggy bank!");
  } catch (error) {
    res.status(500).json(error);
  }
});



router.post("/delete-saving", async function (req, res) {
  try {
    await Saving.findOneAndDelete({_id : req.body.savingId})
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/get-all-saving", async (req, res) => {
  const { frequency, selectedRange , type } = req.body;
  try {
    const savings = await Saving.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      userid: req.body.userid,
      ...(type!=='all' && {type})
    });

    res.send(savings);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;