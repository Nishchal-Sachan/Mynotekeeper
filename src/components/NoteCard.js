import React from 'react';

const NoteCard = ({ note, onClick, onDelete }) => {
    return (
        <div style={styles.card} onClick={onClick}>
            <h3>{note.title}</h3>
            <p>{note.tagline}</p>
            {note.isPinned && <span>📌</span>}
            <button
                style={styles.deleteButton}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the note click event
                    onDelete(note.id); // Pass the note ID to the delete handler
                }}
            >
                Delete
            </button>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px',
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
    },
};

export default NoteCard;
