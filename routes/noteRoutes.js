const express = require('express');
const router = express.Router();
const { getNotes, createNote, deleteNote } = require('../utils/noteControl.js');

router.get('/api/notes', getNotes);

router.post('/api/notes', createNote);

router.delete('/api/notes/:id', deleteNote);

module.exports = router;
