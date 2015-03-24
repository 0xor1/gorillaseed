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