const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

const notes = require('./db/db.json')


// function to create new note data

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    // add the data to the db.json file
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )

    return note;
}


// get path to notes.html after clicking "get started" button on index.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// GET /api/notes should read the db.json file and return all saved notes as JSON.

app.get('/api/notes', (req, res) => {
    return res.json(notes);
})

// JSON data path
app.get('/db/db', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
});



// get path to index.html, needs to be after all the GET routes or it will override everything else.

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})


// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/notes', (req, res) => {

    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    const newNote = createNewNote(req.body, notes);

    // console.log(newNote);

    // notes.push(newNote);

    res.json(notes);
})



// app listener >>>>>>>>>>>>>>>>>

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}!`);
})
