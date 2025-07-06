const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/auth");
const { generateNoteInsight } = require("../controllers/notesController");

const router = express.Router();

// GET all notes for logged-in user
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
});

// GET single note
router.get("/:noteId", auth, async (req, res) => {
  const note = await Note.findOne({ _id: req.params.noteId, userId: req.userId });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
});

// POST a new note
router.post("/", auth, async (req, res) => {
  const newNote = await Note.create({ ...req.body, userId: req.userId });
  res.status(201).json(newNote);
});

// PUT/update a note
router.put("/:noteId", auth, async (req, res) => {
  const updated = await Note.findOneAndUpdate(
    { _id: req.params.noteId, userId: req.userId },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Note not found" });
  res.json(updated);
});

// DELETE a note
router.delete("/:noteId", auth, async (req, res) => {
  await Note.deleteOne({ _id: req.params.noteId, userId: req.userId });
  res.json({ message: "Note deleted" });
});

// AI suggestion for a note
router.post("/ai/suggest", auth, async (req, res) => {
  const { content } = req.body;
  const suggestion = await generateNoteInsight(content);
  res.json({ suggestion });
});

module.exports = router;
