const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index
router.get('/', (req, res) => {
    let pCreat = fs.readFileSync('./prehistoric_creatures.json');
    let cretureData = JSON.parse(pCreat);
    console.log(cretureData);

    res.render('p_creat/index', { pCreat: cretureData })
});

// New
router.get('/new', (req, res) => {
    res.render('p_creat/new');
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