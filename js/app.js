'use strict';

angular.module('app', ['ngMessages'])
    .run(['$rootScope', "$interval", function ($rootScope, $interval) {

    }])

    .controller('mainCtrl', ['$scope', '$http', '$rootScope', '$interval', function ($scope, $http, $rootScope, $interval) {
        $scope.artifacts = [];
        $scope.artifact = {};
        $scope.users = [];
        $scope.user = {};

        $scope.categoryFilter = '';
        console.log('Inside Controller' + $scope.categoryFilter);

        $scope.notifyUsers = function () {
            console.log('notifyUsers');
        };

        $scope.$watch("artifacts", function (newValue, oldValue) {
            $scope.notifyUsers();
        });

        $scope.filterArtifact = function (data) {
            console.log('filterArtifact', arguments);
            $scope.getData('artifacts', {category: 'Art'});

            $http.post('/madeit/email',
                {data: {email: '7205601915@tmomail.net', msg:'test'}}).then(function(response) {
                console.log('emailUser good', response);
            }, function(err) {
                console.log('emailUser err', err);
            });
        };

        $scope.addArtifact = function (artifact) {
            console.log('addArtifact', artifact);
            $http.post('/madeit/artifacts', artifact).then(function(response) {
                console.log('addArtifact good', response);
                $scope.artifacts.push(artifact);
            }, function(err) {
                console.log('addArtifact err', err);
            });
        };

        $scope.addUser = function (user) {
            console.log('addUser', user);
            $http.post('/madeit/users', user).then(function(response) {
                console.log('addUser good', response);
                $scope.users.push(user);
            }, function(err) {
                console.log('addUser err', err);
            });
        };

        var apiBase = '/madeit/';
        $scope.getData = function (resourceName, params) {
            params = params || {};
            console.log('ctrl.getData', arguments);
            $http.get(apiBase + resourceName, params ? {params: params} : {}).then(function (response) {
                $scope[resourceName] = response.data;
                console.log('getData', resourceName, response, $scope[resourceName]);
            }, function (err) {
                console.log('getData err', resourceName, err);
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
