'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])
    /**
     * @ngdoc object
     * @name myApp.login:LoginCtrl
     * @description
     * # Controller
     * Controller for login screen. contains all the behavioral functions for login screen
     */
    .controller('LoginCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.checkCred = function () {
            $location.path('/home');
        };
    }]);