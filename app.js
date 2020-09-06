/*
Project: Sample CRUD
Author: Ali Hussain Mubarak 
language: Node.js / express.js
E-mail: alihussainmubarak@yahoo.com
Date: 04/09/2020
*/

// Express.js framework
const express = require('express')
const app = express()

// Path
const path = require('path')

// Database mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ali8:ali8@cluster.figbc.mongodb.net/ali8?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('DB is connected!');
  });

// Models
const Crud = require('./models/crud');

// Body parser
const bodyParser = require('body-parser');
const { clearScreenDown } = require('readline');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Home route
app.get('/', (req, res) => {
    Crud.find({}, function(err, posts) {
        if (!err) {
            res.render('index', {
                title: 'HOME',
                posts: posts
              })
        } else {
            console.log(err)
        }
    })
})

// Routes folder
let post = require('./routes/post')
app.use('/post', post)

// Port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(port));


