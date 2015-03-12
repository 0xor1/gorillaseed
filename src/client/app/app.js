require.config({
    baseUrl: 'app/component',
    paths: {
        'ng': '../lib/angular-1.3.14'
    }
});

require([
    'ng',
    'counter/ctrl'
],
function(
    ng,
    counterCtrl){

    var module = ng.module('module', []);

    counterCtrl(module);

    ng.element(document).ready(function() {
        ng.bootstrap(document, ['module']);
    });

});