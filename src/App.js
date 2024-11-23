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

    const handleDeleteNote = async (noteId) => {
        try {
            await axios.delete(`http://localhost:5000/notes/${noteId}`);
            toast.success('Note deleted successfully!');
            fetchNotes(page); // Refresh the notes
        } catch (error) {
            console.error('Error deleting note:', error); // Debugging
            toast.error('Failed to delete the note. Please try again.');
        }
    };

    return (
        <div style={styles.appContainer}>
            <h1 style={styles.header}>Notekeeper</h1>

            {/* Create New Note Button */}
            <div style={styles.buttonContainer}>
                <button style={styles.createButton} onClick={() => setEditorNote({})}>
                    Create New Note
                </button>
            </div>

            {/* Notes Grid */}
            <NoteGrid notes={notes} setEditorNote={setEditorNote} onDelete={handleDeleteNote} />

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

const styles = {
    appContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '16px',
        fontFamily: '"Arial", sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '16px',
        color: '#333',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '16px',
    },
    createButton: {
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    createButtonHover: {
        backgroundColor: '#0056b3',
    },
};

export default App;
