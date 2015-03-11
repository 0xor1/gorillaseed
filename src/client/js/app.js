require.config({
    baseUrl: 'js',
    paths: {
        '$': 'lib/jquery-2.1.3',
        'ng': 'lib/angular-1.3.14'
    }
});

require([
    'ng'
],
function(
    ng){

    var addGetAndIncrementHandlerFuncs = function($scope, $http, counter){
        var post = counter.substring(0, 1).toUpperCase() + counter.substring(1);
        ['get', 'increment'].forEach(function(pre){
            var handler = pre+post;
            $scope[handler] = function(){
                $http.post('api/v1/counter/'+handler).success(function(data){
                    $scope[counter] = data.counter;
                });
            };
        });
    };

    var gorillaseedApp = ng.module('gorillaseedApp', []);

    gorillaseedApp.controller('counterCtrl', [ '$scope', '$http', function($scope, $http){
        addGetAndIncrementHandlerFuncs($scope, $http, 'globalCounter');
        addGetAndIncrementHandlerFuncs($scope, $http, 'myCounter');
        $scope.getGlobalCounter();
        $scope.getMyCounter();

    }]);

    ng.element(document).ready(function() {
        ng.bootstrap(document, ['gorillaseedApp']);
    });

});