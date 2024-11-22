const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// Add a new note
router.post('/', async (req, res) => {
    try {
        const note = new Note(req.body);
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add note', error });
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
    console.log('Received update request:', req.params.id, req.body); // Debug log
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error); // Debug log
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
