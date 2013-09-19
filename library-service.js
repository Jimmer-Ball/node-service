// -----------------------------------------------------------------
// Create the library service that runs on express that runs on node
// -----------------------------------------------------------------
var application_root = __dirname;
var express = require('express');
var path = require('path');
var routes = require('./server/routes');

// -----------------------------------------
// Create and configure web framework server
// -----------------------------------------
var app = express();
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(application_root, 'public')));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// -------------------------------------------
// Load all our routes that deal with requests
// -------------------------------------------
routes(app);

// ---------------------------------
// Start the web server on port 4711
// ---------------------------------
var port = 4711;
app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});

