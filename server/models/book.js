var mongoose = require('mongoose');

// --------------------------------------------------------------------------
// Define the book model on the server side and export it as the "Book" model
// --------------------------------------------------------------------------
var Keywords = new mongoose.Schema({
    keyword: String
});

var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [ Keywords ]
});

module.exports = mongoose.model('Book', Book);
