exports.config = {
    baseUrl: 'http://gorillaseed.net',

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
    }
};