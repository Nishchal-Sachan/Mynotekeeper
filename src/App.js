import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteGrid from './components/NoteGrid';
import NoteEditor from './components/NoteEditor';
import Pagination from './components/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState(1);
    const [editorNote, setEditorNote] = useState(null);
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
    const handleSaveNote = async (updatedNote) => {
        try {
            if (updatedNote.id) {
                // Update an existing note
                await axios.put(`http://localhost:5000/notes/${updatedNote.id}`, updatedNote);
                toast.success('Note updated successfully!');
            } else {
                // Create a new note
                await axios.post('http://localhost:5000/notes', updatedNote);
                toast.success('Note created successfully!');
            }
            fetchNotes(page); // Refresh the notes
            setEditorNote(null); // Close the editor
        } catch (error) {
            console.error('Error saving note:', error); // Log for debugging
            toast.error('Failed to save the note. Please try again.');
        }
    };


    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Notekeeper</h1>
            <NoteGrid notes={notes} setEditorNote={setEditorNote} />

            {/* Render the NoteEditor when a note is being edited */}
            {editorNote && (
                <NoteEditor
                    note={editorNote}
                    onSave={handleSaveNote}
                    onClose={() => setEditorNote(null)}
                />
            )}

            {/* Render Pagination only if the editor is not open */}
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
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '16px',
    },
    title: {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '16px',
        color: '#333',
    },
};

export default App;
