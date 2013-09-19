// site/js/app.js

var app = app || {};

// Note the use of on page DOM ready here, not sure
// if this works nicely with JQuery mobile (to be investigated)
$(function () {
    // Decorate our page with stuff from JQuery UI
    $( '#releaseDate' ).datepicker();
    // Show the view of the library
    new app.LibraryView();
});

