const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// make the server uses our html css and js files in the public folder
app.use(express.static('public'));

let notes = require('./db/db.json')

// function to create new note data

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    // add the data to the notesArray, which is the db.json file.
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    )
    return note;
}

// function to validate the data of the notes

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// GET ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>

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


// POST ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 

app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
    // if data in the req.body is incorrect, send 400 error back to user
    if (!validateNote(req.body)) {
        res.status(400).send('Your note is not properly formatted.');
    } else {
        const newNote = createNewNote(req.body, notes);
        res.json(notes);
    }
})

// DELETE the note when the button is clicked
app.delete('/api/notes/:id', (req, res) => {
    // filter through the array and see if the note id matches the id of the note clicked for deletion.
    notes = notes.filter((note) => {
        if (note.id !== req.params.id) {
            // if the note does not equal the id of the note clicked on, return it as true and continue to display on the web page.
            return true;
        }
        // if the note equals the id of the note clicked on, return it as false, removing it from the array.
        return false;
    })

    // update the db.json file to reflect that the note has been deleted.
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    )
    res.json(notes);
})

// app listener >>>>>>>>>>>>>>>>>

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}!`);
})
