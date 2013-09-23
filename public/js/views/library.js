// ----------------------
// LibraryView definition
// ----------------------
define(['jquery', 'backbone', 'underscore', 'js/collections/library', 'js/views/book'],
    function ($, Backbone, _, LibraryCollection, BookView) {
    return Backbone.View.extend({
        el: '#books',
        /**
         * Go get the books from the Mongo database using the URL defined in the library collection
         */
        initialize: function () {
            this.collection = new LibraryCollection();
            this.collection.fetch({reset: true});
            this.render();
            // Setup any event listeners on the collection so when new books are added we re-render
            this.listenTo(this.collection, 'add', this.renderBook);
            this.listenTo(this.collection, 'reset', this.render);
        },
        /**
         * Render library by rendering each book in its collection
         */
        render: function () {
            this.collection.each(function (item) {
                this.renderBook(item);
            }, this);
        },
        /**
         * Render a book given the view for a book
         *
         * @param item
         */
        renderBook: function (item) {
            var bookView = new BookView({
                model: item
            });
            this.$el.append(bookView.render().el);
        },
        /**
         * Provide an addBook event handler on the button whose id is "add"
         */
        events: {
            'click #add': 'addBook'
        },
        /**
         * Add a book to collection, formatting the data in the model along the way.
         *
         * @param e event
         */
        addBook: function (e) {
            e.preventDefault();
            var formData = {};
            $('#addBook').find('div').children('input').each(function (i, el) {
                if ($(el).val() != '') {
                    if (el.id === 'keywords') {
                        formData[ el.id ] = [];
                        _.each($(el).val().split(' '), function (keyword) {
                            formData[ el.id ].push({ 'keyword': keyword });
                        });
                    } else if (el.id === 'releaseDate') {
                        formData[ el.id ] = $('#releaseDate').datepicker('getDate').getTime();
                    } else {
                        formData[ el.id ] = $(el).val();
                    }
                }
                // Clear input field value
                $(el).val('');
            });
            this.collection.create(formData);
        }
    });
});