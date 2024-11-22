const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/Note');
const router = express.Router();

// Add a new note
router.post('/', async (req, res) => {
    // Explicitly remove _id from the request body
    if (req.body._id) {
        delete req.body._id;
    }
    try {
        const newNote = new Note(req.body); // Create a new note without _id
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error('Error creating note:', error); // Log the error
        res.status(500).json({ message: 'Failed to create note', error });
    }
});


// Get paginated notes
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 6 } = req.query;
        const skip = (page - 1) * limit;

        const [notes, total] = await Promise.all([
            Note.find().sort({ isPinned: -1, createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            Note.countDocuments(),
        ]);

        res.status(200).json({ notes, total });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notes', error });
    }
});

// Update a note
router.put('/:id', async (req, res) => {
    const noteId = req.params.id;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ message: 'Invalid note ID' });
    }

    try {
        // Update the note
        const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error); // Log the error
        res.status(500).json({ message: 'Failed to update note', error });
    }
});


// Delete a note
router.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete note', error });
    }
});

module.exports = router;
