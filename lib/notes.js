const fs = require("fs");
const path = require("path");
const { uuid } = require('uuidv4');

function findById(id, notes) {
    const result = notes.filter(notes => notes.id === id)[0];
    return result;
}

function createNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync( 
        path.join(__dirname, '../db/db.json'), //Writes the new animal data to our animals.json file in the data subdirectory by using the method path.join() to join the value of __dirname, which represents the directory of the file we execute the code in, with the path to the animals.json file
        JSON.stringify({ notes: notesArray }, null, 2) //Converts the JavaScript array data to JSON. The other two arguments used in the method, null and 2, are means of keeping the data formatted
    );                                                     //The null argument means we don't want to edit any of our existing data; if we did, we could pass something in there. The 2 indicates we want to create white space between our values to make it more readable. 
    return note;
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