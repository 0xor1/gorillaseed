var ScreenshotReporter = require('protractor-screenshot-reporter');
var path = require('path');

exports.config = {
    baseUrl: 'http://gorillaseed-1.appspot.com',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    allScriptsTimeout: 11000,

    specs: [
        'tests/**/*.js'
    ],

    multiCapabilities: [{
        'browserName': 'chrome'
    },{
     'browserName': 'firefox'
     }/*,{ //TODO figure out how to run against IE11 on win8.1 webdrivers ie driver only seems to like up to IE10 :(
     'browserName': 'internet explorer'
     }*/],

    directConnect: false,

    framework: 'jasmine',

    restartBrowserBetweenTests: false,

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    },

    onPrepare: function(){
        jasmine.getEnv().addReporter(new ScreenshotReporter({
            baseDirectory: 'results',
            //takeScreenShotsOnlyForFailedSpecs: true,
            pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                return path.join(capabilities.caps_.browserName, spec.suite.description, spec.env.currentSpec.description);
            }
        }));
    }
};