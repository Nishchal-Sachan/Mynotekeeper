import React from 'react';

const NoteCard = ({ note, onClick }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }} onClick={onClick}>
            <h3>{note.title}</h3>
            <p>{note.tagline}</p>
            {note.isPinned && <span>📌</span>}
        </div>
    );
};

export default NoteCard;