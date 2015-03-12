define('counter/ctrl', [
    'text!counter/tpl.html'],
    function(
        tpl
        ){

    return function(ngModule){
        ngModule
        .controller('counterCtrl', [ '$scope', '$http', function($scope, $http){
            $scope.getGlobalCounter = function(){
                $http.post('api/v1/counter/getGlobalCounter').success(function(data){
                    $scope.globalCounter = data.counter;
                });
            };
            $scope.incrementGlobalCounter = function(){
                $http.post('api/v1/counter/incrementGlobalCounter').success(function(data){
                    $scope.globalCounter = data.counter;
                });
            };
            $scope.getMyCounter = function(){
                $http.post('api/v1/counter/getMyCounter').success(function(data){
                    $scope.myCounter = data.counter;
                });
            };
            $scope.incrementMyCounter = function(){
                $http.post('api/v1/counter/incrementMyCounter').success(function(data){
                    $scope.myCounter = data.counter;
                });
            };
            $scope.getGlobalCounter();
            $scope.getMyCounter();
        }])
        .directive('goCounter', function(){
            return {restrict: 'E', template: tpl};
        });
    }
});