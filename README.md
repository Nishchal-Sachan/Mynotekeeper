Notekeeper Application
A full-stack Notekeeper Application built with React, Node.js, and MongoDB that allows users to manage their notes effectively. The application supports creating, updating, deleting, and viewing notes in a paginated grid layout.

Features
Create Notes: Add a new note with a title, tagline, body, and pin option.
Update Notes: Edit existing notes directly in a popup form.
Delete Notes: Remove notes from the list with a single click.
Pin Notes: Pinned notes always appear at the top.
Pagination: Displays up to 6 notes per page.
Responsive Design: Optimized for desktop and mobile screens.
Error Handling: User-friendly toast notifications for errors.
Tech Stack
Frontend: React
Backend: Node.js, Express.js
Database: MongoDB
Styling: Inline CSS
Other Tools: Axios, Toastify
Getting Started
Prerequisites
Ensure you have the following installed on your system:

Node.js (v16 or higher)
MongoDB (local or Atlas)
Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/notekeeper.git
cd notekeeper
2. Install Dependencies
For the Backend:

cd backend
npm install
For the Frontend:

cd frontend
npm install
3. Configure the Environment
Backend:

Create a .env file in the backend directory with the following:
MONGO_URI=mongodb://localhost:27017/myNotekeeperDB
PORT=5000
Frontend:

Ensure the axios base URL in the frontend matches your backend URL.
4. Start the Application
Backend:

cd backend
node server.js
Frontend:

cd frontend
npm start
API Endpoints
Base URL: http://localhost:5000
1. GET /notes
Fetch paginated notes.

Query Parameters:
page (default: 1): The current page number.
limit (default: 6): Number of notes per page.
2. POST /notes
Create a new note.

Request Body:
{
  "title": "Sample Title",
  "tagline": "Sample Tagline",
  "body": "Note content here.",
  "isPinned": false
}
3. PUT /notes/:id
Update an existing note.

Path Parameter:
id: The note's unique MongoDB ID.
Request Body:
{
  "title": "Updated Title",
  "tagline": "Updated Tagline",
  "body": "Updated content.",
  "isPinned": true
}
4. DELETE /notes/:id
Delete a note by ID.

Path Parameter:
id: The note's unique MongoDB ID.
Project Structure
notekeeper/
├── backend/
│   ├── models/
│   │   └── Note.js       # Mongoose schema for notes
│   ├── routes/
│   │   └── notes.js      # Routes for note operations
│   ├── server.js         # Backend entry point
│   └── package.json      # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NoteCard.js       # Note card component
│   │   │   ├── NoteEditor.js     # Popup for creating/updating notes
│   │   │   └── NoteGrid.js       # Grid layout for displaying notes
│   │   ├── App.js                # Main app component
│   │   └── index.js              # Frontend entry point
│   ├── package.json              # Frontend dependencies
│   └── public/                   # Static files
└── README.md
Usage
Add a New Note:

Click "Create New Note."
Fill in the title, tagline, body, and optionally pin the note.
Edit a Note:

Click on an existing note in the grid.
Modify the details in the popup and click "Save."
Delete a Note:

Click the "Delete" button on a note card.
Pagination:

Navigate between pages using the pagination buttons.
Known Issues
Ensure MongoDB is running locally or update the MONGO_URI in .env for Atlas.
For large datasets, pagination might require optimization.
Future Improvements
Add user authentication.
Support for tagging and searching notes.
Improved styling using CSS frameworks like Tailwind or Material-UI.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.