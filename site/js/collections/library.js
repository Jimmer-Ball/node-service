// site/js/collections/library.js

var app = app || {};

// Our library is a collection of books
app.Library = Backbone.Collection.extend({
    model: app.Book,
    url: '/api/books'
});