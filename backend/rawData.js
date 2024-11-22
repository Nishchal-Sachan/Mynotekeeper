const mongoose = require('mongoose');

// MongoDB URI
const MONGO_URI = 'mongodb+srv://nishchal:nishchal@cluster0.4uyua.mongodb.net/Mynoteskeeper?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection string

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define the Note model (replicate your schema here)
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tagline: { type: String },
    body: { type: String, required: true },
    isPinned: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);

// Raw data to seed
const notes = [
    {
        title: 'First Note',
        tagline: 'My first tagline',
        body: 'This is the body of the first note.',
        isPinned: true,
    },
    {
        title: 'Second Note',
        tagline: 'Important note',
        body: 'This is an important note to remember.',
        isPinned: false,
    },
    {
        title: 'Third Note',
        tagline: 'Random thoughts',
        body: 'These are just some random thoughts.',
        isPinned: false,
    },
    {
        title: 'Fourth Note',
        tagline: 'Pinned note',
        body: 'This note should appear pinned.',
        isPinned: true,
    },
    {
        title: 'Fifth Note',
        tagline: 'To-do list',
        body: 'Don’t forget to complete your tasks!',
        isPinned: false,
    },
    {
        title: 'Sixth Note',
        tagline: 'Meeting notes',
        body: 'Notes from the client meeting last week.',
        isPinned: false,
    },
];

// Seed the database
const seedData = async () => {
    try {
        // Clear existing notes
        await Note.deleteMany();
        console.log('Existing notes cleared.');

        // Insert new notes
        await Note.insertMany(notes);
        console.log('Notes added successfully.');

        // Close the connection
        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

// Run the seed function
seedData();
