// --------------------------------------------------------------------
// Setup the configuration for RequireJS. basically setup path aliases
// for libraries, and setup shims for any "non-AMD compliant" libraries
// that need to "export" non-AMD features.
// --------------------------------------------------------------------
require.config({
    paths: {
        'backbone': 'js/lib/backbone',
        'i18n': 'js/lib/i18n',
        'jquery': 'js/lib/jquery',
        'jquery-dateFormat': 'js/lib/jquery-dateFormat',
        'jquery-ui': 'js/lib/jquery-ui',
        'text': 'js/lib/text',
        'underscore': 'js/lib/underscore'
    },
    shim: {
        'jquery-dateFormat': {
            exports: '$',
            deps: ['jquery']
        },
        'jquery-ui': {
            exports: '$',
            deps: ['jquery']
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },
    // This is needed else you get JQuery being looked for in the wrong location.
    baseUrl: "../"
});

// ----------------------------------------------------------------
// So here we are saying on page DOM load, associate a date picker
// with the releaseDate field, and create a new LibraryView, and so
// avoid any global "namespace" tosh.  Note that we are requiring
// JQuery-UI as it automatically requires JQuery too via the deps
// , so both $ and .datepicker "work".
// ----------------------------------------------------------------
require(['jquery-ui', 'js/views/library'], function ($, LibraryView) {
    $(function () {
        $('#releaseDate').datepicker();
        new LibraryView();
    });
});

