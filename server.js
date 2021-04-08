const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();




const notes = require('./db/db.json')



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
    const newNote = req.body

    console.log(newNote);

    notes.push(newNote);

    res.json(newNote);
})



// app listener >>>>>>>>>>>>>>>>>

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}!`);
})
