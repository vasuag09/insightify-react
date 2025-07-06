const express = require("express");
const Job = require("../models/Job");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all jobs for logged-in user
router.get("/", auth, async (req, res) => {
  const jobs = await Job.find({ userId: req.userId });
  res.json(jobs);
});

// Create a job
router.post("/", auth, async (req, res) => {
  const newJob = await Job.create({ ...req.body, userId: req.userId });
  res.status(201).json(newJob);
});
// Get a specific job by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.userId });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Error fetching job", error: err.message });
  }
});
// Update/edit a job
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: "Error updating job", error: err.message });
  }
});
// Delete a job
router.delete("/:id", auth, async (req, res) => {
  await Job.deleteOne({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Deleted" });
});

module.exports = router;
