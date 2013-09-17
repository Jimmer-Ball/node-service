// Node application dependencies, which were initially installed via npm install working
// against the package.json at the root level of the project.
var application_root = __dirname,
    express = require('express'), //Web framework
    path = require('path'), //Utilities for dealing with file paths
    mongoose = require('mongoose'); //MongoDB integration

//Create web framework server
var app = express();

// Configure web framework server
app.configure(function () {
    //parses request body and populates request.body
    app.use(express.bodyParser());

    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());

    //perform route lookup based on url and HTTP method
    app.use(app.router);

    //Where to serve static content
    app.use(express.static(path.join(application_root, 'site')));

    //Show all errors in development
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Start web server on port 4711
var port = 4711;
app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});

// Connect to Mongo database. The database "library_database" will be created on first
// save to it, so nice one mongo, saves a load of time it does indeed here.
mongoose.connect('mongodb://localhost/library_database');

// Keywords for books
var Keywords = new mongoose.Schema({
    keyword: String
});

// Books
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [ Keywords ]
});

// Mongoose accessor or "model" classes via which we can play with documents that meet the schema
// so CRUD operations et al.
var BookModel = mongoose.model('Book', Book);


// API method: Get a list of all books
app.get('/api/books', function (request, response) {
    return BookModel.find(function (err, books) {
        if (!err) {
            return response.send(books);
        } else {
            return console.log(err);
        }
    });
});

//Insert a new book
app.post('/api/books', function (request, response) {
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate,
        keywords: request.body.keywords
    });
    book.save(function (err) {
        if (!err) {
            return console.log('created');
        } else {
            return console.log(err);
        }
    });
    return response.send(book);
});

// Get book by ID
app.get('/api/books/:id', function (request, response) {
    return BookModel.findById(request.params.id, function (err, book) {
        if (!err) {
            return response.send(book);
        } else {
            return console.log(err);
        }
    });
});

// Update a book
app.put('/api/books/:id', function (request, response) {
    console.log('Updating book ' + request.body.title);
    return BookModel.findById(request.params.id, function (err, book) {
        book.title = request.body.title;
        book.author = request.body.author;
        book.releaseDate = request.body.releaseDate;
        book.keywords = request.body.keywords;

        return book.save(function (err) {
            if (!err) {
                console.log('book updated');
            } else {
                console.log(err);
            }
            return response.send(book);
        });
    });
});

//Delete a book
app.delete( '/api/books/:id', function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return BookModel.findById( request.params.id, function( err, book ) {
        return book.remove( function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

// API method: Call the root of the API to see if its running
app.get('/api', function (request, response) {
    console.log("Got an API call");
    response.send('Library API is running');
});

