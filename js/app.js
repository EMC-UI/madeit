'use strict';

angular.module('app', ['ngMessages'])
    .run(['$rootScope', "$interval", function($rootScope, $interval) {

    }])

    .controller('mainCtrl', ['$scope', '$http', '$rootScope', '$interval', function ($scope, $http, $rootScope, $interval) {
        $scope.artifacts = [];
        $scope.user = { };
        $scope.categoryFilter = '';
        console.log('Inside Controller'+$scope.categoryFilter);

        $scope.notifyUsers = function() {
            console.log('notifyUsers');
        };

        $scope.addItem= function (user){
        console.log('Added User');
            // $http.post('/madeit/users', {
            //     'data': user
            // })
            //     .success(function (data, status, headers, config) {
            //         $scope.added = 'true';
            // })
            //     .error(function (data, status, header, config) {
            //         console.log('Error ' + status);
            //         //errorsCommon.displayServerReponseFailure($i18next('installer.error.installPostError'), '', response);
            //     });
        }


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
            $scope.added = false;
            // load users from db
            $scope.getData('users');
            $scope.getData('artifacts');
        };
        $scope.init();
    }]);
