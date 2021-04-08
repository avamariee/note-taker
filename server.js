const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();




const notes = require('./db/db.json')

// get path to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// get path to notes.html after clicking "get started" button on index.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/db/db', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
});


app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}!`);
})
