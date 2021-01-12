// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('home')
// })

// app.listen(8000, () => console.log('server is working'));
// // basic setup 

const express = require('express');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const app = express();
const path = require('path')


// layouts

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(path.join(__dirname, '/static')));
// getting new info, body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    // res.send('home')
    res.render('home')
})

app.use('/dinos', require('./routes/dinos'));
app.use('/p_creat', require('./routes/p_creat'));

app.listen(8000, () => console.log('server is working'));