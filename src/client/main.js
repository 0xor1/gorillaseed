require.config({
    baseUrl: 'component',
    paths: {
        'ng': '../lib/angular-1.3.14',
        'text': '../lib/require-text-2.0.14'
    }
});

require([
    'ng',
    'counter/ctrl'
], function(
    ng,
    counterCtrl
){
    var app = ng.module('app', []);

    counterCtrl(app);

    ng.element(document).ready(function() {
        ng.bootstrap(document, ['app']);
    });
});