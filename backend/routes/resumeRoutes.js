// backend/routes/resume.js
const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const { parseResume } = require("../controllers/resumeController");

const router = express.Router();
const upload = multer();

router.post("/upload", auth, upload.single("resume"), parseResume);

module.exports = router;
