'use strict';

angular.module('app', ['ngMessages','ui.bootstrap'])
    .run(['$rootScope', "$interval", function($rootScope, $interval) {

    }])

    .controller('mainCtrl', ['$scope', '$http', '$rootScope', '$interval', function ($scope, $http, $rootScope, $interval) {
        $scope.artifacts = [];
        $scope.user = { };
        console.log('Inside Controller');

        $scope.notifyUsers = function() {
            console.log('notifyUsers');
        };

        $scope.$watch("contents", function(newValue, oldValue){
            $scope.notifyUsers();
        });

        var apiBase = '/madeit/';
        $scope.getData = function(resourceName) {
            $http.get(apiBase + resourceName).then(function (response) {
                $scope[resourceName] = response.data[resourceName];
                console.log('getData', resourceName, $scope[resourceName]);
            });
        };
        $scope.init = function () {
            // load users from db
            $scope.getData('users');
            $scope.getData('artifacts');
        };
        $scope.init();
    }]);
