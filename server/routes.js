// -------------------------------------------------
// Pick up the database models we need in our routes
// -------------------------------------------------
var db = require('./db');
var Book = db.Book;

// --------------------------------------------
// Export the set of routes provided by the API
// --------------------------------------------
module.exports = function (app) {
    /**
     * Get hold of all the books we have
     */
    app.get('/api/books', function (request, response) {
        console.log('Getting all books');
        return Book.find(function (err, books) {
            if (!err) {
                return response.send(books);
            } else {
                return console.log(err);
            }
        });
    });
    /**
     * Post a new book
     */
    app.post('/api/books', function (request, response) {
        console.log('Creating a new book, where we delegate to MongoDB to set the unique _id value');
        var book = new Book({
            title: request.body.title,
            author: request.body.author,
            releaseDate: request.body.releaseDate,
            keywords: request.body.keywords
        });
        book.save(function (err) {
            if (!err) {
                return console.log('Created new book');
            } else {
                return console.log(err);
            }
        });
        return response.send(book);
    });
    /**
     * Get hold of a book by its ID
     */
    app.get('/api/books/:id', function (request, response) {
        console.log('Getting a book with id: ' + request.params.id);
        return Book.findById(request.params.id, function (err, book) {
            if (!err) {
                console.log("Returning book details");
                return response.send(book);
            } else {
                return console.log(err);
            }
        });
    });
    /**
     * Update a book's details given its ID
     */
    app.put('/api/books/:id', function (request, response) {
        console.log('Updating a book with title: ' + request.body.title);
        return Book.findById(request.params.id, function (err, book) {
            book.title = request.body.title;
            book.author = request.body.author;
            book.releaseDate = request.body.releaseDate;
            book.keywords = request.body.keywords;

            return book.save(function (err) {
                if (!err) {
                    console.log('Book updated');
                } else {
                    console.log(err);
                }
                return response.send(book);
            });
        });
    });
    /**
     * Delete a book given its ID
     */
    app.delete('/api/books/:id', function (request, response) {
        console.log('Deleting a book with id: ' + request.params.id);
        return Book.findById(request.params.id, function (err, book) {
            return book.remove(function (err) {
                if (!err) {
                    console.log('Book removed');
                    return response.send('');
                } else {
                    console.log(err);
                }
            });
        });
    });
    /**
     * Backstop method to see if we (the API) is running.  Eventually this should return almost WADL that describes
     * the services.  At least that's what I'd want if I was developing against my "API". At the moment its just
     * plain text in un-chunked form, so with a known length.
     */
    app.get('/api', function (request, response) {
        console.log("Got an API call");
        var body = 'The library-service is running';
        response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8",
                                  "Content-Length": Buffer.byteLength(body, ["UTF-8"]) });
        response.end(body);
    });
};


