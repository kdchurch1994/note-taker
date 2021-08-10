const router = require('express').Router();
const { findById, createNote, noteValidation } = require('../../lib/notes');
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

router.get('notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
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

module.exports = router;