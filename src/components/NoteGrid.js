import React from 'react';
import NoteCard from './NoteCard';

const NoteGrid = ({ notes, setEditorNote }) => {
    if (!notes || notes.length === 0) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>No notes available</div>;
    }

    return (
        <div style={styles.gridContainer}>
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} onClick={() => setEditorNote(note)} />
            ))}
        </div>
    );
};

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
    },
};

export default NoteGrid;
