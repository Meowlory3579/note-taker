const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})


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


// POST request to add a note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
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

                // Add a new review
                parsedNotes.push(newNote);

                // Write updated reviews back to the file
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

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);