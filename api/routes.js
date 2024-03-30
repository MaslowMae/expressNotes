const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');



// Load notes from notes.json
const notesPath = path.join(__dirname, '..', 'db', 'notes.json');

// Function to read notes from file
const readNotesFromFile = () => {
    try {
        const data = fs.readFileSync(notesPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading notes from file:', error);
        return [];
    }
};

// Function to write notes to file
const writeNotesToFile = (notes) => {
    try {
        fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing notes to file:', error);
    }
};


// Route to get all notes
router.get('/notes', (req, res) => {
    const notes = readNotesFromFile();
    res.json(notes);
});


// Route to create a new note
router.post('/notes', (req, res) => {
    const newNote = req.body;
    const notes = readNotesFromFile();
    newNote.id = Math.random().toString(36).substr(2, 9); // Generate a random ID
    notes.push(newNote);
    writeNotesToFile(notes);
    res.status(201).json(newNote);
});

// Route to delete a note by ID
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    let notes = readNotesFromFile();
    notes = notes.filter(note => note.id !== noteId);
    writeNotesToFile(notes);
    res.json({ message: `Deleted note with ID ${noteId}` });
});

module.exports = router;