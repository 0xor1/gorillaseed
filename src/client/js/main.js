$(document).ready(function(){

    var counter = $('span#global-counter')

    $('#refresh-button').click(getGlobalCounter);
    $('#increment-button').click(incrementGlobalCounter);

    function getGlobalCounter() {
        $.post('api/v1/counter/get', success);
    }

    function incrementGlobalCounter(){
        $.post('api/v1/counter/increment', success);
    }

    function success(data){
        counter.text(data.counter);
    }
});


