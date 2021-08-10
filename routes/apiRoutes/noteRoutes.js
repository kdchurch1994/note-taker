const router = require('express').Router();
const { findById, createNote, noteValidation } = require('../../lib/notes');
const notes = require('../../db/db.json');
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.jon(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();
    console.log(req.body);

    if (!noteValidation(req.body)) {
        res.status(400).send("This note it not formatted properly.");
    } else {
        console.log(notes)
        const note = createNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;