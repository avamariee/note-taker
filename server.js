const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();




const notes = require('./db/db.json')


app.get('/db/db', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
});


app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}!`);
})
