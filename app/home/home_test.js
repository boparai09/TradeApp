'use strict';

describe('myApp.home module', function () {

    beforeEach(module('myApp.home'));

    describe('home controller', function () {
        var MainCtrl,
            scope,
            initialTrades = [
                {"symbol": "ibm", "quantity": 2342, "price": "123123", "target": "123131", "stopLoss": "1233", "transDate": ""},
                {"symbol": "bmbm", "quantity": 23423, "price": "241431", "target": "1231311", "stopLoss": "131123", "transDate": ""},
                {"symbol": "ibm", "quantity": 21, "price": "23423", "target": "123133", "stopLoss": "123", "transDate": ""}
            ],
            trading={
                saveTrade: function () {
                    return {then:function(para){
                        para.call();
                    }};
                },
                getTrades: function () {
                    return initialTrades;
                }
            };

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('HomeCtrl', {
                $scope: scope,
                trading:trading
            });
        }));

        it('Need to initiate scope variables', function () {
            expect(scope.trades).toBeDefined();
        });
        it('Check functionality of submit trade', function () {
            scope.trades = initialTrades;
            scope.trade = {"symbol": "ibm", "quantity": 21, "price": "23423", "target": "123133", "stopLoss": "123", "transDate": "21/12/2016"};
            scope.tradeForm={$invalid:false,$setPristine:function(){}};
            var compiled = [
                {"symbol": "ibm", "quantity": 2342, "price": "123123", "target": "123131", "stopLoss": "1233", "transDate": ""},
                {"symbol": "bmbm", "quantity": 23423, "price": "241431", "target": "1231311", "stopLoss": "131123", "transDate": ""},
                {"symbol": "ibm", "quantity": 21, "price": "23423", "target": "123133", "stopLoss": "123", "transDate": ""},
                {"symbol": "ibm", "quantity": 21, "price": "23423", "target": "123133", "stopLoss": "123", "transDate": "21/12/2016"}
            ];
            expect(scope.submitTrade).toBeDefined();
            scope.submitTrade();
            expect(scope.trades).toEqual(compiled);
        });

        it('should average of all the trades with symbol', function () {
            scope.trades = [
                {"symbol": "ibm", "quantity": 2342, "price": "123123", "target": "123131", "stopLoss": "1233", "transDate": ""},
                {"symbol": "bmbm", "quantity": 23423, "price": "241431", "target": "1231311", "stopLoss": "131123", "transDate": ""},
                {"symbol": "ibm", "quantity": 21, "price": "23423", "target": "123133", "stopLoss": "123", "transDate": ""}
            ];
            var compiled = [{"symbol":"ibm","quantity":2363,"price":"122236.97","target":"123131.02","stopLoss":"1223.14","transDate":""},{"symbol":"bmbm","quantity":23423,"price":"241431","target":"1231311","stopLoss":"131123","transDate":""}];
            scope.compileTrades();
            expect(scope.compiledTrades).toEqual(compiled);
        });

        it('Define the functionality to delete any trade', function () {
            expect(scope.deleteTrade).toBeDefined();
        });

        it('Check deleteTrade function', function () {
            scope.trades = [
                {"symbol": "ibm", "quantity": 2342, "price": "123123", "target": "123131", "stopLoss": "1233", "transDate": ""},
                {"symbol": "bmbm", "quantity": 23423, "price": "241431", "target": "1231311", "stopLoss": "131123", "transDate": ""},
                {"symbol": "ibm", "quantity": 21, "price": "23423", "target": "123133", "stopLoss": "123", "transDate": ""}
            ];
            var compiled = [
                {"symbol": "ibm", "quantity": 2342, "price": "123123", "target": "123131", "stopLoss": "1233", "transDate": ""},
                {"symbol": "bmbm", "quantity": 23423, "price": "241431", "target": "1231311", "stopLoss": "131123", "transDate": ""}
            ];
            scope.deleteTrade(2);
            expect(scope.trades).toEqual(compiled);
        });
    });
    describe('validateMin Directive', function () {
        var compile, scope, directiveElem;

        beforeEach(function(){
            inject(function($compile, $rootScope){
                compile = $compile;
                scope = $rootScope.$new();
            });

            directiveElem = getCompiledElement();
        });

        function getCompiledElement(){
            scope.input = 11;
            var element = angular.element(
                '<form name="tradeForm">' +
                    '<input type="text" id="target" name="target" data-validate-min="10" ng-model="input"/>'+
                '</form>'
            );
            var compiledElement = compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }
        it('should have input element, trigger min validation and fail wrong val', function () {
            var inputElement = directiveElem.find('input');
            expect(inputElement).toBeDefined();
            scope.tradeForm.target.$setViewValue(9);
            scope.$digest();
            expect(scope.tradeForm.target.$valid).toBe(false);
        });

        it('should trigger min validation and pass the correct value', function () {
            scope.tradeForm.target.$setViewValue(12);
            scope.$digest();
            expect(scope.tradeForm.target.$valid).toBe(true);
        });
    });
    describe('validateMax Directive', function () {
        var compile, scope, directiveElem;

        beforeEach(function(){
            inject(function($compile, $rootScope){
                compile = $compile;
                scope = $rootScope.$new();
            });

            directiveElem = getCompiledElement();
        });

        function getCompiledElement(){
            scope.input = 8;
            var element = angular.element(
                '<form name="tradeForm">' +
                '<input type="text" id="target" name="target" data-validate-max="10" ng-model="input"/>'+
                '</form>'
            );
            var compiledElement = compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }
        it('should have input element, trigger max validation and fail wrong val', function () {
            var inputElement = directiveElem.find('input');
            expect(inputElement).toBeDefined();
            scope.tradeForm.target.$setViewValue(11);
            scope.$digest();
            expect(scope.tradeForm.target.$valid).toBe(false);
        });

        it('should trigger max validation and pass the correct value', function () {
            scope.tradeForm.target.$setViewValue(9);
            scope.$digest();
            expect(scope.tradeForm.target.$valid).toBe(true);
        });
    })
    describe('validateTransDate Directive', function () {
        var compile, scope, directiveElem;

        beforeEach(function(){
            inject(function($compile, $rootScope){
                compile = $compile;
                scope = $rootScope.$new();
            });

            directiveElem = getCompiledElement();
        });

        function getCompiledElement(){
            scope.transDate = '26/04/2017';
            var element = angular.element(
                '<form name="tradeForm">' +
                '<input type="text" id="transDate" name="transDate" validate-trans-date ng-model="transDate"/>'+
                '</form>'
            );
            var compiledElement = compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }
        it('should have input element', function () {
            var inputElement = directiveElem.find('input');
            expect(inputElement).toBeDefined();
        });

        it('should not pass the incorrect date value', function () {
            scope.tradeForm.transDate.$setViewValue('123123');
            scope.$digest();
            expect(scope.tradeForm.transDate.$valid).toBe(false);
        });

        it('should not allow past date value even in correct format', function () {
            scope.tradeForm.transDate.$setViewValue('26/05/2009');
            scope.$digest();
            expect(scope.tradeForm.transDate.$valid).toBe(false);
        });

        it('should not allow date value ahead than 31/11/2025 in correct format', function () {
            scope.tradeForm.transDate.$setViewValue('31/11/2026');
            scope.$digest();
            expect(scope.tradeForm.transDate.$valid).toBe(false);
        });

        it('should not allow invalid date in correct format', function () {
            scope.tradeForm.transDate.$setViewValue('31/02/2018');
            scope.$digest();
            expect(scope.tradeForm.transDate.$valid).toBe(false);
        });

        it('should pass the correct date value', function () {
            scope.tradeForm.transDate.$setViewValue('26/05/2017');
            scope.$digest();
            expect(scope.tradeForm.transDate.$valid).toBe(true);
        });

    })
});

