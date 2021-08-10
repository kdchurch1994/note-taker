const fs = require("fs");
const path = require("path");

function findById(id, notes) {
    const result = notes.filter(note => note.id === id)[0];
    return result;
}

function createNote(body) {
    const note = body;
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        const noteData = JSON.parse(data);
        const newNote = [noteData, note]
        JSON.stringify({ notes: newNote}, null, 2);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify({notes: newNote}, null, 2), (err, data) => {
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
    findById,
    createNote,
    noteValidation
};