const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// Return the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// Read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, jsonData) => {
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
});


// Promisify version
// app.get('/', (req, res) => {
//     readFromFile('./db/db.json').then((data) =>
//       res.json(JSON.parse(data))
//     );
// });


// POST request to add a note. Receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the user.
app.post('/api/notes', (req, res) => {
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
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new note
                parsedNotes.push(newNote);

                // Write updated notes back to the file
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );
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
});

// DELETE request to delete a note based on query parameter containing the id
app.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id, 10); // Ensures the ID is an integer
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
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
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 4), (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return res.status(500).json({ error: 'Error saving notes' });
            }
            // Respond to the request indicating the note was deleted
            res.json({ message: 'Note deleted' });
        });
    });
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);