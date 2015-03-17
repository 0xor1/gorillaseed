define([
    'ng',
    'counter/ctrl'
], function(
    ng,
    counterCtrl
){
    counterCtrl(ng.module('testApp', []));

    describe('counterCtrl', function(){
        var httpBackend,
            scope,
            createController,
            getGlobalCounterRequestHandler,
            incrementGlobalCounterRequestHandler,
            getMyCounterRequestHandler,
            incrementMyCounterRequestHandler
            ;

        beforeEach(function(){
            module('testApp');
            inject(function($injector){
                httpBackend = $injector.get('$httpBackend');
                scope = $injector.get('$rootScope').$new();
                var $controller = $injector.get('$controller');

                getGlobalCounterRequestHandler = httpBackend.whenPOST( 'api/v1/counter/getGlobalCounter').respond({counter: 0});
                incrementGlobalCounterRequestHandler = httpBackend.whenPOST( 'api/v1/counter/incrementGlobalCounter').respond({counter: 1});
                getMyCounterRequestHandler = httpBackend.whenPOST( 'api/v1/counter/getMyCounter').respond({counter: 0});
                incrementMyCounterRequestHandler = httpBackend.whenPOST( 'api/v1/counter/incrementMyCounter').respond({counter: 1});

                createController = function(){
                    return $controller('counterCtrl', {'$scope': scope});
                };
            });
        });

        afterEach(function(){
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should get global and my counters on initialisation', function(){
            httpBackend.expectPOST('api/v1/counter/getGlobalCounter');
            httpBackend.expectPOST('api/v1/counter/getMyCounter');
            createController();
            httpBackend.flush();
            expect(scope.globalCounter).toEqual(0);
            expect(scope.myCounter).toEqual(0);
        });

        it('should get global counter', function(){
            createController();
            httpBackend.flush();
            getGlobalCounterRequestHandler.respond({counter: 123});
            httpBackend.expectPOST('api/v1/counter/getGlobalCounter');
            scope.getGlobalCounter();
            httpBackend.flush()
            expect(scope.globalCounter).toEqual(123);
        });

        it('should get my counter', function(){
            createController();
            httpBackend.flush();
            getMyCounterRequestHandler.respond({counter: 123});
            httpBackend.expectPOST('api/v1/counter/getMyCounter');
            scope.getMyCounter();
            httpBackend.flush();
            expect(scope.myCounter).toEqual(123);
        });

        it('should increment global counter', function(){
            createController();
            httpBackend.flush();
            incrementGlobalCounterRequestHandler.respond({counter: 123});
            httpBackend.expectPOST('api/v1/counter/incrementGlobalCounter');
            scope.incrementGlobalCounter();
            httpBackend.flush();
            expect(scope.globalCounter).toEqual(123);
        });

        it('should increment my counter', function(){
            createController();
            httpBackend.flush();
            incrementMyCounterRequestHandler.respond({counter: 123});
            httpBackend.expectPOST('api/v1/counter/incrementMyCounter');
            scope.incrementMyCounter();
            httpBackend.flush();
            expect(scope.myCounter).toEqual(123);
        });
    });
});