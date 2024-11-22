import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteGrid from './components/NoteGrid.js';
import NoteEditor from './components/NoteEditor.js';
import Pagination from './components/Pagination.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState(1);
    const [editorNote, setEditorNote] = useState(null); // Manages both editing and creating
    const [totalNotes, setTotalNotes] = useState(0);

    const NOTES_PER_PAGE = 6;

    // Fetch notes from the backend
    const fetchNotes = async (currentPage) => {
        try {
            const response = await axios.get(`http://localhost:5000/notes`, {
                params: { page: currentPage, limit: NOTES_PER_PAGE },
            });
            setNotes(response.data.notes);
            setTotalNotes(response.data.total);
        } catch (error) {
            toast.error('Failed to fetch notes. Please try again.');
        }
    };

    // Fetch notes when the page changes
    useEffect(() => {
        fetchNotes(page);
    }, [page]);

    // Handle saving a note
    const handleSaveNote = async (note) => {
        try {
            if (note.id) {
                // Update existing note
                const { id, ...noteData } = note; // Exclude id for PUT request
                await axios.put(`http://localhost:5000/notes/${id}`, noteData);
                toast.success('Note updated successfully!');
            } else {
                // Create new note
                const { id, _id, ...noteData } = note; // Ensure _id and id are excluded
                await axios.post('http://localhost:5000/notes', noteData);
                toast.success('Note created successfully!');
            }
            fetchNotes(page); // Refresh notes
            setEditorNote(null); // Close the editor
        } catch (error) {
            toast.error('Failed to save the note. Please try again.');
        }
    };



    return (
        <div>
            <h1>Notekeeper</h1>

            {/* Create New Note Button */}
            <div>
                <button onClick={() => setEditorNote({})}>
                    Create New Note
                </button>
            </div>

            {/* Notes Grid */}
            <NoteGrid notes={notes} setEditorNote={setEditorNote} />

            {/* Note Editor */}
            {editorNote && (
                <NoteEditor
                    note={editorNote}
                    onSave={handleSaveNote}
                    onClose={() => setEditorNote(null)}
                />
            )}

            {/* Pagination */}
            {!editorNote && (
                <Pagination
                    currentPage={page}
                    setPage={setPage}
                    totalPages={Math.ceil(totalNotes / NOTES_PER_PAGE)}
                />
            )}

            <ToastContainer />
        </div>
    );
};
export default App;
