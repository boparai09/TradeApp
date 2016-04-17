'use strict';

describe('myApp.view2 module', function () {

    beforeEach(module('myApp.view2'));

    describe('view2 controller', function () {
        var MainCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('View2Ctrl', {
                $scope: scope
            });
        }));

        it('should attach a list of student to the scope', function () {
            expect(scope.trades).toBeDefined();
        });

        it('should calculate minimum , maximum and average', function () {
            scope.trades = [
                {"symbol": "ibm", "quantity": 2342, "price": "123123", "target": "123131", "stopLoss": "1233", "transDate": ""},
                {"symbol": "bmbm", "quantity": 23423, "price": "241431", "target": "1231311", "stopLoss": "131123", "transDate": ""},
                {"symbol": "ibm", "quantity": 21, "price": "23423", "target": "123133", "stopLoss": "123", "transDate": ""}
            ];
            $scope.compileTrades();
            expect($scope.compiledTrades).toBe(650);
        });
    });
});

