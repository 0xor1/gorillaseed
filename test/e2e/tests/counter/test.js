var page = require('./page.js');

'use strict';

describe('counter', function() {

    beforeEach(function(){
        page.get();
    });

    it('should initialise global counter to a number', function() {
        expect(element(by.binding('globalCounter')).getText()).toMatch(/Global Counter: [0-9]*/);
    });

    it('should initialise my counter to a number', function() {
        expect(element(by.binding('myCounter')).getText()).toMatch(/My Counter: [0-9]*/);
    });

    it('should refresh global counter', function() {
        var startVal = page.getGlobalCounter();
        page.refreshGlobalCounter()
        var endVal = page.getGlobalCounter();
        expect(startVal).toEqual(endVal);
    });

    it('should increment global counter', function() {
        var startVal = page.getGlobalCounter();
        page.incrementGlobalCounter()
        var endVal = page.getGlobalCounter();
        expect(startVal.then(function(val){return val + 1;})).toEqual(endVal);
    });

    it('should refresh my counter', function() {
        var startVal = page.getMyCounter();
        page.refreshMyCounter()
        var endVal = page.getMyCounter();
        expect(startVal).toEqual(endVal);
    });

    it('should increment my counter', function() {
        var startVal = page.getMyCounter();
        page.incrementMyCounter()
        var endVal = page.getMyCounter();
        expect(startVal.then(function(val){return val + 1;})).toEqual(endVal);
    });

});
