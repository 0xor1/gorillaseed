module.exports = {
    get: function(){
        browser.get('');
    },

    getGlobalCounter: function(){
        var deferred = protractor.promise.defer();
        element(by.binding('globalCounter')).getText().then(function(val){
            deferred.fulfill(parseInt(val));
        });
        return deferred.promise;
    },

    refreshGlobalCounter: function(){
        element(by.buttonText('Refresh Global Counter')).click()
    },

    incrementGlobalCounter: function(){
        element(by.buttonText('Increment Global Counter')).click()
    },

    getMyCounter: function(){
        var deferred = protractor.promise.defer();
        element(by.binding('myCounter')).getText().then(function(val){
            deferred.fulfill(parseInt(val));
        });
        return deferred.promise;
    },

    refreshMyCounter: function(){
        element(by.buttonText('Refresh My Counter')).click()
    },

    incrementMyCounter: function(){
        element(by.buttonText('Increment My Counter')).click()
    }
}