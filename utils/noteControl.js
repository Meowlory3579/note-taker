const path = require('path');
const fs = require('fs');

// Get existing notes
const getNotes = (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, jsonData) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        else {
            console.log('File data:', jsonData)
            let notes = JSON.parse(jsonData);
            res.json(notes);
        }
    });
};

// Create new note
const createNote = (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object will save
        const newNote = {
            title,
            text,
            id: Math.floor(Math.random() * 10000),
        };

        // Obtain existing notes
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new note
                parsedNotes.push(newNote);

                // Write updated notes back to the file
                fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(parsedNotes, null, 4), (writeErr) => {
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully updated notes!')
                });
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
};

// Delete note
const deleteNote = (req, res) => {
    const noteId = parseInt(req.params.id, 10); // Ensures the ID is an integer
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Parse the existing notes
        const notes = JSON.parse(data);
        // Find the index of the note with the given ID
        const noteIndex = notes.findIndex(note => note.id === noteId);

        // If the note wasn't found, return a 404 (Not Found) status
        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Remove the note from the array
        notes.splice(noteIndex, 1);

        // Write the updated notes back to the file
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 4), (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return res.status(500).json({ error: 'Error saving notes' });
            }
            // Respond to the request indicating the note was deleted
            res.json({ message: 'Note deleted' });
        });
    });
};

module.exports = { getNotes, createNote, deleteNote };
