const mongoose = require('mongoose');

let crudSchema = mongoose.Schema({
    title: String,
    author: String,
    body: String
  });

let Posts = module.exports = mongoose.model('Posts', crudSchema);
