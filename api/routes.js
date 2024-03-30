const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load notes from notes.json
const notesPath = path.join(__dirname, '..', 'db', 'notes.json');
let notes = JSON.parse(fs.readFileSync(notesPath, 'utf8'));

// Route to get all notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

// Route to create a new note
router.post('/notes', (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    fs.writeFileSync(notesPath, JSON.stringify(notes), 'utf8');
    res.status(201).json(newNote);
});

// Route to delete a note by ID
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    notes = notes.filter(note => note.id !== noteId);
    fs.writeFileSync(notesPath, JSON.stringify(notes), 'utf8');
    res.json({ message: `Deleted note with ID ${noteId}` });
});

module.exports = router;