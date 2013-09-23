require.config({
    // Fix the base URL to be in the root of the whole project
    // above the public and test directories, as it makes working
    // out the paths to use a bit better
    baseUrl: '../../..',
    // All relative from the project root directory
    paths: {
        jquery: 'public/js/lib/jquery',
        underscore: 'public/js/lib/underscore',
        backbone: 'public/js/lib/backbone',
        jasmine: 'test/client/jasmine/lib/jasmine-1.3.1/jasmine',
        'jasmine-html': 'test/client/jasmine/lib/jasmine-1.3.1/jasmine-html',
        spec: 'test/client/jasmine/spec/'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

require(['jquery', 'jasmine-html'], function($, jasmine){
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };
    //  This is a bit rubbish this, I'd rather not need to list each test spec
    // in turn manually
    var specs = [];
    specs.push('spec/BookSpec');
    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });
});
