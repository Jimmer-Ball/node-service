// -----------------------------------------------------------------
// Book view definition plus RequireJS templating. Note we require
// jquery-dateFormat as the template includes a call to $.format
// which is ONLY defined in the JQuery plugin so extends base JQuery
// -----------------------------------------------------------------
define(['jquery-dateFormat', 'backbone', 'underscore', 'text!templates/bookView.html'],
    function ($, Backbone, _, bookViewTemplate) {
    return Backbone.View.extend({
        tagName: 'div',
        className: 'bookContainer',
        template: _.template(bookViewTemplate),
        /**
         * Populate the element in tagName with the populated template, where the data
         * comes from the model. Note this.$el is what we define in tagName for the view.
         *
         * @returns {*} this
         */
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        /**
         * Add an event handler to anything of class delete, and call deleteBook
         */
        events: {
            'click .delete': 'deleteBook'
        },
        /**
         * Delete the book model, then delete the view of the book from the display
         */
        deleteBook: function () {
            this.model.destroy();
            this.remove();
        }
    });
});