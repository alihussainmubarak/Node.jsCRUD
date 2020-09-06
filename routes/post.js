// Express.js
const express = require('express')

// Models
let Crud = require('../models/crud');

// Router
const router = express.Router()

// Create route
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'CREATE POST'
    })
  })

// Create submitted
router.post('/create', (req, res) => {
    let crud = new Crud();
    crud.title = req.body.title
    crud.body = req.body.body
    crud.save(function(err) {
        if (!err) {
            res.redirect('/')
        } else {
            console.log(err);
        }
    })
})

// Show one post
router.get('/:id', (req, res) => {
    Crud.findById(req.params.id, function(err, post) {
        if (!err) {
            res.render('post', {
                post: post
            })
        } else {
            console.log(err);
        }
    })
})

// Edit post route
router.get('/edit/:id', (req, res) => {
    Crud.findById(req.params.id, function(err, post) {
        if (!err) {
            res.render('edit', {
                title: 'EDIT POST',
                post: post
            })
        } else {
            console.log(err);
        }       
    })
})

// Update submitted
router.post('/edit/:id', (req, res) => {
    let crud = {};
    crud.title = req.body.title
    crud.body = req.body.body

    let query = {_id:req.params.id}

    Crud.update(query, crud, function(err) {
        if (!err) {
            res.redirect('/')
        } else {
            console.log(err);
        }
    })
})

// Delete post
router.get('/delete/:id', (req, res) => {
    Crud.findByIdAndRemove(req.params.id, function(err, doc) {
        if (!err) {
            res.redirect('/')
        } else (
            console.log(err)
        )
    })
})

module.exports = router