const express = require('express');
const notesRoutes = require('./routes/noteRoutes.js');
const path = require('path');

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', notesRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
