require.config({
    baseUrl: 'js',
    paths: {
        '$': 'lib/jquery-2.1.3',
        'ng': 'lib/angular-1.3.14'
    }
});

require([
    '$',
    'ng'
],
function(
    $,
    ng){

    $(document).ready(function() {

        var globalCounter = $('#global-counter');
        $('#global-refresh-button').click(getGlobalCounter);
        $('#global-increment-button').click(incrementGlobalCounter);
        function getGlobalCounter() {
            $.post('api/v1/counter/getGlobalCounter', globalSuccessHandler);
        }
        function incrementGlobalCounter() {
            $.post('api/v1/counter/incrementGlobalCounter', globalSuccessHandler);
        }
        function globalSuccessHandler(data) {
            globalCounter.text(data.counter);
        }

        var myCounter = $('#my-counter');
        $('#my-refresh-button').click(getMyCounter);
        $('#my-increment-button').click(incrementMyCounter);
        function getMyCounter() {
            $.post('api/v1/counter/getMyCounter', mySuccessHandler);
        }
        function incrementMyCounter() {
            $.post('api/v1/counter/incrementMyCounter', mySuccessHandler);
        }
        function mySuccessHandler(data) {
            myCounter.text(data.counter);
        }

    });

});