// -------------------------------------------
// Collection of books also known as a Library
// -------------------------------------------
define(['backbone', 'js/models/book'], function (Backbone, Book) {
    return Backbone.Collection.extend({
        model: Book,
        url: '/api/books'
    });
});