// -----------------------
// Connect to the database
// -----------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library_database');

// ---------------------------------------------------------------------
// Export all database models are so they can be accessed via db.<model>
// in any other piece running on node that requires the "db" directory.
// ---------------------------------------------------------------------
module.exports = {
    Book: require('./models/book')
};