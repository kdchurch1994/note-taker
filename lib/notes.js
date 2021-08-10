const fs = require("fs");
const path = require("path");
const { uuid } = require('uuidv4');

function findById(id, notes) {
    const result = notes.filter(notes => notes.id === id)[0];
    return result;
}

function createNote(body, notesArray) {
    let note = body;
    note.id = uuid();
    notesArray.push(note);

    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        const noteText = JSON.parse(data);
        const newNote = [...noteText, note];
        JSON.stringify(newNote);
        res.json(newNote);
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(writeNewNote), (err, data) => {
        });
    });
}

function noteValidation(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true
};

module.exports = { 
    findById,
    createNote,
    noteValidation
};