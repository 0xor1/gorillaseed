'use strict';

//global non-component level tests

describe('Gorillaseed App', function() {

    it('should redirect www.gorillaseed.net to gorillaseed.net', function() {
        browser.get('http://www.gorillaseed.net');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toBe('http://gorillaseed.net/');
        });
    });

});
