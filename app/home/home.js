'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', 'trading', function ($scope, trading) {
        $scope.trades = trading.getTrades();
        $scope.reset = function () {
            $scope.trade = {
                symbol: '',
                quantity: '',
                price: 0,
                target: 0,
                stopLoss: 0,
                transDate: ''
            };
        };

        $scope.submitTrade = function () {
            if (!$scope.tradeForm.$invalid) {
                $scope.loading = true;
                trading.saveTrade().then(function () {
                    $scope.trades.push($scope.trade);
                    $scope.reset();
                    $scope.loading = false;
                    $scope.tradeForm.$setPristine();
                })
            }
        };

        /*This function will iterate through all the trades and combine based on symbol*/

        $scope.compileTrades = function () {
            var compiledTradesKey = {};
            $scope.compiledTrades = [];
            for (var i = 0, currentTrade; i < $scope.trades.length; i++) {
                currentTrade = angular.copy($scope.trades[i]);
                if (!!compiledTradesKey[currentTrade.symbol]) {
                    updateKeyValue(currentTrade, compiledTradesKey[currentTrade.symbol]);
                } else {
                    compiledTradesKey[currentTrade.symbol] = currentTrade;
                }
            }
            for (var key in compiledTradesKey) {
                if (compiledTradesKey.hasOwnProperty(key)){
                    $scope.compiledTrades.push(compiledTradesKey[key]);
                }
            }
        };
        /*
         * This Function will update already complied object with new entry of trade
         * this will increase the counter, add new values and calculate new average
         * */
        function updateKeyValue(trade, compiledForSymbol) {
            var totalQuantity = parseFloat(compiledForSymbol.quantity) + parseFloat(trade.quantity);
            compiledForSymbol.price = (((compiledForSymbol.price * compiledForSymbol.quantity) + (trade.price * trade.quantity)) / totalQuantity).toFixed(2);
            compiledForSymbol.target = (((compiledForSymbol.target * compiledForSymbol.quantity) + (trade.target * trade.quantity)) / totalQuantity).toFixed(2);
            compiledForSymbol.stopLoss = (((compiledForSymbol.stopLoss * compiledForSymbol.quantity) + (trade.stopLoss * trade.quantity)) / totalQuantity).toFixed(2);
            compiledForSymbol.quantity = totalQuantity;
        }

        $scope.deleteTrade = function (index) {
            if (index < $scope.trades.length) {
                $scope.trades.splice(index, 1);
            }
        };
        $scope.downloadCSV = function () {
            alasql("SELECT * INTO CSV('trades.csv') FROM ?",[$scope.compiledTrades]);
        };
        $scope.reset();
    }])
    .factory('trading', ['$q', '$timeout',
        function ($q, $timeout) {
            return {
                getTrades: function () {
                    return [
                        {"symbol": "ibm", "quantity": 2342, "price": "123123", "target": "123131", "stopLoss": "1233", "transDate": ""},
                        {"symbol": "bmbm", "quantity": 23423, "price": "241431", "target": "1231311", "stopLoss": "131123", "transDate": ""},
                        {"symbol": "ibm", "quantity": 21, "price": "23423", "target": "123133", "stopLoss": "123", "transDate": ""}
                    ];
                },
                saveTrade: function () {
                    var deferred = $q.defer();
                    $timeout(function () {
                        deferred.resolve();
                    }, 1000);
                    return deferred.promise;
                }
            };
        }
    ])
    .directive('validateMin', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.validateMin, function () {
                    minValidator(ctrl.$modelValue);
                });
                var minValidator = function (value) {
                    var min = (!isNaN(attr.validateMin) && parseFloat(attr.validateMin)) || scope.$eval(attr.validateMin) || 0;
                    if (!isEmpty(value) && parseFloat(value) < parseFloat(min)) {
                        ctrl.$setValidity('validateMin', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('validateMin', true);
                        return value;
                    }
                };

                function isEmpty(value) {
                    return angular.isUndefined(value) || isNaN(value) || value === '' || value === null || value !== value;
                }

                ctrl.$parsers.push(minValidator);
                ctrl.$formatters.push(minValidator);
            }
        };
    })
    .directive('validateMax', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.validateMax, function () {
                    maxValidator(ctrl.$modelValue);
                });
                var maxValidator = function (value) {
                    var max = (!isNaN(attr.validateMax) && parseFloat(attr.validateMax)) || scope.$eval(attr.validateMax) || Infinity;
                    if (!isEmpty(value) && parseFloat(value) > parseFloat(max)) {
                        ctrl.$setValidity('validateMax', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('validateMax', true);
                        return value;
                    }
                };

                function isEmpty(value) {
                    return angular.isUndefined(value) || isNaN(value) || value === '' || value === null || value !== value;
                }

                ctrl.$parsers.push(maxValidator);
                ctrl.$formatters.push(maxValidator);
            }
        };
    })
    .directive('validateTransDate', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                var regex = /([0-3][0-9])[\/]([0-1][0-9])[\/](\d{4})?$/;
                var validator = function (value) {
                    var matches = value.match(regex),
                        valid = (!!matches);
                    if (!isEmpty(value) && !valid) {
                        ctrl.$setValidity('validateTransDate', false);
                        return undefined;
                    } else if (!isEmpty(value) && valid) {
                        // parse each piece and see if it makes a valid date object
                        var day = parseInt(matches[1], 10),
                            month = parseInt(matches[2], 10),
                            year = parseInt(matches[3], 10),
                            date = new Date(year, month - 1, day),
                            now = new Date,
                            maxRange = new Date(2025,11,31);
                        if (!date || !date.getTime()) {
                            ctrl.$setValidity('validateTransDate', false);
                            return undefined;
                        }
                        // make sure we have no funny rollovers that the date object sometimes accepts
                        // month > 12, day > what's allowed for the month
                        if (date.getMonth() + 1 != month ||
                            date.getFullYear() != year ||
                            date.getDate() != day) {
                            ctrl.$setValidity('validateTransDate', false);
                            return undefined;
                        } else {
                            ctrl.$setValidity('validateTransDate', true);
                            if(date < new Date(now.getUTCFullYear(),now.getMonth(),now.getDate()) || date > maxRange){
                                ctrl.$setValidity('validateTransDateRange', false);
                                return undefined;
                            } else {
                                ctrl.$setValidity('validateTransDateRange', true);
                            }
                            return value;
                        }
                    } else {
                        ctrl.$setValidity('validateTransDate', true);
                        return value;
                    }
                };

                function isEmpty(value) {
                    return angular.isUndefined(value) || value === '' || value === null || value !== value;
                }
                ctrl.$parsers.push(validator);
                ctrl.$formatters.push(validator);
            }
        };
    });