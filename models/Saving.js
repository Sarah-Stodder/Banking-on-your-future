const mongoose = require("mongoose");

const savingSchema = new mongoose.Schema({
  userid : { type: String, required: true},
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true ,default: Date.now},
});

module.exports = mongoose.model("Savings", savingSchema)