define('counter/ctrl', [
    'text!counter/tpl.html'
], function(
    tpl
){
    return function(ngModule){
        ngModule
        .controller('counterCtrl', [ '$scope', '$http', function($scope, $http){
            $scope.getGlobalCounter = function(){
                $http.post('api/v1/counter/getGlobalCounter').success(function(counter){
                    $scope.globalCounter = counter.value;
                });
            };
            $scope.incrementGlobalCounter = function(){
                $http.post('api/v1/counter/incrementGlobalCounter').success(function(counter){
                    $scope.globalCounter = counter.value;
                });
            };
            $scope.getMyCounter = function(){
                $http.post('api/v1/counter/getMyCounter').success(function(counter){
                    $scope.myCounter = counter.value;
                });
            };
            $scope.incrementMyCounter = function(){
                $http.post('api/v1/counter/incrementMyCounter').success(function(counter){
                    $scope.myCounter = counter.value;
                });
            };
            $scope.getGlobalCounter();
            $scope.getMyCounter();
        }])
        .directive('cpCounter', function(){
            return {restrict: 'E', template: tpl};
        });
    }
});