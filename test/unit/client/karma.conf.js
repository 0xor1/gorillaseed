module.exports = function(config) {
    config.set({

        basePath: '../../../',

        frameworks: ['jasmine', 'requirejs'],

        files: [
            {pattern: 'test/unit/client/require.conf.js', included: true},
            {pattern: 'src/client/lib/*.js', included: false},
            {pattern: 'test/unit/client/lib/*.js', included: false},
            {pattern: 'src/client/component/**/*.js', included: false},
            {pattern: 'src/client/component/**/*.html', included: false},
            {pattern: 'test/unit/client/tests/component/*.js', included: false}
        ],

        plugins: [
            'karma-jasmine',
            'karma-requirejs',
            'karma-coverage',
            'karma-html-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-safari-launcher',
            'karma-ie-launcher'
        ],

        reporters: ['coverage', 'html', 'progress'],

        preprocessors: {
            'src/client/component/**/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'html',
            dir: 'test/unit/client/coverage/'
        },

        htmlReporter: {
            outputDir: 'results' //it is annoying that this file path isn't from basePath :(
        },

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome', 'Firefox', 'IE', 'Safari'],

        captureTimeout: 5000,

        singleRun: true
    });
};