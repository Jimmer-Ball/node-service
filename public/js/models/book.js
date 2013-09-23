// ----------------------------------------------------------------------------------
// Return a Book definition.  Hell you can call it what you want when you refer to it
// in your list of imports in a define statement.
// ----------------------------------------------------------------------------------
define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
        defaults: {
            coverImage: 'img/placeholder.png',
            title: 'No title',
            author: 'Unknown',
            releaseDate: 'Unknown',
            keywords: 'None'
        },
        /**
         * Alter the DB server response before it is passed to the model constructor.  So, what comes
         * back with an identifier of "_id" is mutated to have an identifier of name "id".  Why, well
         * MongoDB uses "_id" as the common way of identifying things.  It is automatically added
         * to any document schema for any thing to be stored in a collection of documents.  However
         * the rest of the UI knows about "id" and not about "_id", we don't want storage specific
         * idioms creeping into the model if we can avoid it.
         *
         * Note any sort of clever editing can be done here, not just this specific MongoDB stuff.
         *
         * @param response
         * @returns {*}
         */
        parse: function (response) {
            response.id = response._id;
            return response;
        }
    });
});