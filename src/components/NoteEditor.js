import React, { useState } from 'react';

const NoteEditor = ({ note, onSave, onClose }) => {
    // State to manage the form fields
    const [title, setTitle] = useState(note.title || '');
    const [tagline, setTagline] = useState(note.tagline || '');
    const [body, setBody] = useState(note.body || '');
    const [isPinned, setIsPinned] = useState(note.isPinned || false);

    // Handle form submission
    const handleSave = () => {
        if (!title || !body) {
            alert('Title and Body are required!');
            return;
        }
        // Pass the updated note to the `onSave` function
        onSave({ ...note, title, tagline, body, isPinned });
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.header}>{note.id ? 'Edit Note' : 'Create Note'}</h2>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Title:</label>
                    <input
                        style={styles.input}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Tagline:</label>
                    <input
                        style={styles.input}
                        type="text"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Body:</label>
                    <textarea
                        style={styles.textarea}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        <input
                            type="checkbox"
                            checked={isPinned}
                            onChange={(e) => setIsPinned(e.target.checked)}
                        />
                        Pin this note
                    </label>
                </div>
                <div style={styles.actions}>
                    <button style={styles.saveButton} onClick={handleSave}>
                        Save
                    </button>
                    <button style={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        width: '400px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
        marginBottom: '16px',
        fontSize: '1.5rem',
        color: '#333',
    },
    formGroup: {
        marginBottom: '16px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '1rem',
        color: '#666',
    },
    input: {
        width: '100%',
        padding: '8px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '8px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        cursor: 'pointer',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        color: '#333',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        cursor: 'pointer',
    },
};

export default NoteEditor;
