const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  data: { type: Object, required: true }, // parsed JSON object
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resume", ResumeSchema);