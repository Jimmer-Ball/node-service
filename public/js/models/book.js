// site/js/models/book.js

var app = app || {};

app.Book = Backbone.Model.extend({
    defaults: {
        coverImage: 'img/placeholder.png',
        title: 'No title',
        author: 'Unknown',
        releaseDate: 'Unknown',
        keywords: 'None'
    },
    /**
     * Edit the server response before it is passed to the model constructor.  So, what comes
     * back with an identifier of "_id" is mutated to have an identifier of name "id".  Why, well
     * MongoDB uses "_id" as the common way of identifying things.  It is automatically added
     * to a schema for any thing to be stored in a collection.
     *
     * Note any sort of clever editing can be done here, not just this specific MongoDB stuff.
     *
     * @param response
     * @returns {*}
     */
    parse: function( response ) {
        response.id = response._id;
        return response;
    }
});