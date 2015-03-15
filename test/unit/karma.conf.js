module.exports = function(config) {
    config.set({

        basePath: '../../',

        frameworks: ['jasmine', 'requirejs'],

        files: [
            {pattern: 'test/unit/require.conf.js', include: true},
            {pattern: 'src/client/lib/*.js', include: false},
            {pattern: 'test/unit/lib/*.js', include: false},
            {pattern: 'src/client/component/**/*.js', include: false},
            {pattern: 'src/client/component/**/*.html', include: false},
            {pattern: 'test/unit/tests/component/*.js', include: false}
        ],

        plugins: [
            'karma-jasmine',
            'karma-requirejs',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-safari-launcher',
            'karma-ie-launcher'
        ],

        reporters: ['coverage'],

        preprocessors: {
            'src/client/component/**/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'html',
            dir: 'test/unit/coverage/'
        },

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome', 'Firefox', 'IE', 'Safari'],

        captureTimeout: 5000,

        singleRun: false
    });
};