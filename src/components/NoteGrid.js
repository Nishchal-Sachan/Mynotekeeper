import React from 'react';
import NoteCard from './NoteCard';

const NoteGrid = ({ notes, setEditorNote, onDelete }) => {
    if (!notes || notes.length === 0) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>No notes available</div>;
    }

    return (
        <div style={styles.gridContainer}>
            {notes.map((note) => (
    <NoteCard
        key={note.id || note._id} // Support both id and _id
        note={{ ...note, id: note.id || note._id }} // Normalize id
        onClick={() => setEditorNote(note)}
        onDelete={onDelete}
    />
))}
        </div>
    );
};

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
    },
};

export default NoteGrid;
