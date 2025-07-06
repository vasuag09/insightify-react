const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed, date: new Date().toLocaleDateString() });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(400).json({ message: "User already exists or error occurred" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.json({ user, token });
});

module.exports = router;
