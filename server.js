// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('home')
// })

// app.listen(8000, () => console.log('server is working'));
// // basic setup 

const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const path = require('path')


// layouts

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    // res.send('home')
    res.render('home')
})

app.listen(8000, () => console.log('server is working'));