const express = require('express');
const router = express.Router();
const fs = require('fs');

// mount

// Index
router.get('/', (req, res) => {
    let pCreat = fs.readFileSync('./prehistoric_creatures.json');
    let cretureData = JSON.parse(pCreat);
    console.log(cretureData);
    res.render('p_creat/index', { pCreat: cretureData })
});

// New (p_creat/new)
router.get('/new', (req, res) => {
    // console.log(req.params.id)
    // console.log(cretureData[req.params.id])
    res.render('p_creat/new');
})

// New ()
router.get('/:id', (req, res) => {
    let pCreat = fs.readFileSync('./prehistoric_creatures.json');
    let cretureData = JSON.parse(pCreat);   
    // console.log(req.params.id)
    // console.log(cretureData[req.params.id])
    let index = req.params.id;

    let thisCreture = cretureData[index];

    if (!thisCreture) {
        res.redirect('./p_creat.new');
    } else {
        res.render('p_creat/show', { pCreat: thisCreture, cretureID: index });
    }
    
});

// edit
router.get('/:id/edit', (req, res) => {
    let index = req.params.id;
    let pCreat = fs.readFileSync('./prehistoric_creatures.json');
    let cretureData = JSON.parse(pCreat);
    let thisCreture = cretureData[index];

    if (!thisCreture) {
        res.redirect('./p_creat');
    } else {
        res.render('p_creat/edit', { pCreat: thisCreture, cretureID: index });
    }
})

// update
router.put('/:id', (req, res) => {
    let index = req.params.id;
    let pCreat = fs.readFileSync('./prehistoric_creatures.json');
    let cretureData = JSON.parse(pCreat);
    cretureData[index] = req.body;
    let cretureJSON = JSON.stringify(cretureData);
    fs.writeFileSync(`/p_creat/${req.params.id}`);
})

// delete
router.delete('/:id', (req, res) => {
    let index = req.params.id;
    let pCreat = fs.readFileSync('./prehistoric_creatures.json');
    let cretureJS = JSON.parse(pCreat);

    cretureJS.splice(index, 1);
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(cretureJS));

    res.redirect('/p_creat');
})


router.post('/', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatJS = JSON.parse(creatures);

    creatJS.push(req.body);

    let creatJSON = JSON.stringify(creatJS);

    fs.writeFileSync('./prehistoric_creatures.json', creatJSON);

    res.redirect('/p_creat')
})
module.exports = router;