const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  company: String,
  tags: [String],
  status: { type: String, default: "applied" },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
