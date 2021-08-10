const fs = require("fs");
const path = require("path");

function findById(id) {
    const result = noteData.filter(note => note.id === id)[0];
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        const noteData = JSON.parse(data);
        console.log(noteData);
    });
    return result();
};

function createNote(body) {
    const note = body;
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        const noteData = JSON.parse(data);
        noteData.push(body);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData, null, 2), (err, data) => {
        });
    });
    return note;
};

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
    createNote,
    noteValidation,
    findById
};