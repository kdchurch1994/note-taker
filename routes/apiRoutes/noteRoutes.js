const router = require('express').Router();
const { createNote, noteValidation, findById } = require('../../lib/notes');
const notes = require('../../db/db.json');
const fs = require("fs");
const path = require("path");
const { uuid } = require('uuidv4');


router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../../db/db.json'), (err, data) => {
        let note = JSON.parse(data);
        if (note) {
            res.json(note);
        } else {
            res.send(404);
        };
    });
});

router.post('/notes', (req, res) => {
    req.body.id = uuid();
    
    if (!noteValidation(req.body)) {
        res.status(400).send("This note it not formatted properly.");
    } else {
        const note = createNote(req.body, notes);
        console.log(note);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const noteData = findById(req.params.id)
    console.log(noteData);
    if (!noteData) {
        res.status(400).send("Please select a note to delete");
    } else {
        notes = noteData;
        res.json(notes)
    }
})

module.exports = router;