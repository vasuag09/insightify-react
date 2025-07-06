const express = require("express");
const auth = require("../middleware/auth");
const Resume = require("../models/Resume");

const router = express.Router();

// Save parsed resume
router.post("/save", auth, async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.userId,        // From auth middleware
      data: req.body,            // Parsed resume object
    });

    res.status(201).json(resume);
  } catch (err) {
    console.error("Error saving resume:", err);
    res.status(500).json({ message: "Failed to save resume" });
  }
});

// GET all resumes for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error("Error fetching resumes:", err);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
});

module.exports = router;
