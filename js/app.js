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

        $scope.init = function () {
            // load users from db
            // load contents from db
            $scope.user = { };
        };
        $scope.init();
    }]);
