// site/js/views/library.js

var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    /**
     * Go get the books from the Mongo database using the URL defined in the library collection
     */
    initialize: function () {
        this.collection = new app.Library();
        this.collection.fetch({reset: true}); // NEW
        this.render();
        // Setup any event listeners on the collection so when new books are added we re-render
        this.listenTo(this.collection, 'add', this.renderBook);
        this.listenTo(this.collection, 'reset', this.render);
    },

    // render library by rendering each book in its collection
    render: function () {
        this.collection.each(function (item) {
            this.renderBook(item);
        }, this);
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function (item) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append(bookView.render().el);
    },

    // Provide an addBook event handler on the button whose id is "add"
    events: {
        'click #add': 'addBook'
    },
    /**
     * Add book to collection
     * @param e event
     */
    addBook: function( e ) {
        e.preventDefault();

        var formData = {};

        $( '#addBook').find('div' ).children( 'input' ).each( function( i, el ) {
            if( $( el ).val() != '' )
            {
                if( el.id === 'keywords' ) {
                    formData[ el.id ] = [];
                    _.each( $( el ).val().split( ' ' ), function( keyword ) {
                        formData[ el.id ].push({ 'keyword': keyword });
                    });
                } else if( el.id === 'releaseDate' ) {
                    formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
                } else {
                    formData[ el.id ] = $( el ).val();
                }
            }
            // Clear input field value
            $( el ).val('');
        });

        this.collection.create( formData );
    },
});