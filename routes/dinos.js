const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index
router.get('/', (req, res) => {
    // res.send('dinos baby')
    // read the file that stores all my dinos and save in a variable to use later
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos);
    // console.log(dinos);
    // console.log(dinoData);

    res.render('dinos/index', { dinos: dinoData })
});

// New
router.get('/new', (req, res) => {
    console.log('new dino stuff')
    res.render('dinos/new');
})

// Create - POST / dinos
router.post('/', (req, res) => {
    console.log(req.body)
    // add dino to dinos.json
    
    // turn dinos.json into a mutable array
    let dinos = fs.readFileSync('./dinos.json');
    let dinoJS = JSON.parse(dinos);

    // add new dino from req.body to the array
    dinoJS.push(req.body);

    // Turn dino array into JSON
    let dinoJSON = JSON.stringify(dinoJS)
    // write new dino array to dinos.json
    fs.writeFileSync('./dinos.json', dinoJSON);

    res.redirect('/dinos');
})

module.exports = router;