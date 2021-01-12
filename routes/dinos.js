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


// show/details - / dinos/:id
router.get('/:id', (req, res) => {
    // Get the index
    let dinoIndex = req.params.id;

    // get mutable data index
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos); // this is an array 

    // find dino at index
    let thisDino = dinoData[dinoIndex];
    
    // if there is no dino at dinoData[dinoIndex]
    if (!thisDino) {
        // show a 404 page
        // redirect to dino/new
        res.redirect('./dinos.new');
    } else {
        // ship it
        // res.send(`Show dino with id ${req.params.id}`);
        // res.send(thisDino)
        res.render('dinos/show', { dino: thisDino, dinoID: dinoIndex });
    }

});

// Edit - GEt /dinos/:id/edit
router.get('/:id/edit', (req, res) => {
    // send the dino infor into a client page which is the form for a put route
    
    let dinoIndex = req.params.id;
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos); // this is an array 
    let thisDino = dinoData[dinoIndex];
    
    if (!thisDino) {
        // show a 404 page
        res.redirect('./dinos');
    } else {
        // ship it
        // res.send(`Show dino with id ${req.params.id}`);
        // res.send(thisDino)
        res.render('dinos/edit', { dino: thisDino, dinoID: dinoIndex });
    }    
});

// update route
router.put('/:id', (req, res) => {
    console.log(`PUT to /dinos/${req.params.id}`);
    // console.log(req.body);

    // get the dino from my data store
    let dinoIndex = req.params.id;
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos); // this is an array 

    // console.log(dinoData)
    // update my dino
        // console.log(thisDino);
    dinoData[dinoIndex] = req.body; 
    // console.log(dinoData);
    // write new dino to data store
    let dinoJSON = JSON.stringify(dinoData)
    fs.writeFileSync('./dinos.json', dinoJSON);

    // send my response (redirect to show/details page)
    res.redirect(`/dinos/${req.params.id}`);

    // res.send(`editing dino at ${req.params.id}`);
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