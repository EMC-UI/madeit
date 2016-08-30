'use strict';

angular.module('app', ['ngMessages','ui.bootstrap','ngFileUpload'])
    .run(['$rootScope', "$interval", function($rootScope, $interval) {

    }])

    .controller('mainCtrl', ['$scope', '$http', '$rootScope', '$interval', '$timeout', 'Upload', function ($scope, $http, $rootScope, $interval, $timeout, Upload) {
        $scope.artifacts = [];
        $scope.artifact = {};
        $scope.users = [];
        $scope.user = {};

        $scope.categoryFilter = '';

        $scope.notifyUsers = function () {
            console.log('notifyUsers');
        };

        $scope.$watch("artifacts", function (newValue, oldValue) {
            $scope.notifyUsers();
        });
        $scope.search = function (artifacts) {
            console.log("............"+artifacts.description);
            if($scope.query != null){
                return !!((artifacts.description.indexOf($scope.query || '') !== -1 || artifacts.title.indexOf($scope.query || '') !== -1));
            }
        };

        $scope.filterArtifact = function (data) {
            $scope.getData('artifacts', {category: data});

            $http.post('/madeit/email',
                {data: {email: '7205601915@tmomail.net', msg:'test'}}).then(function(response) {
                console.log('emailUser good', response);
            }, function(err) {
                console.log('emailUser err', err);
            });
        };
        $scope.uploadPic = function(file) {
            file.upload = Upload.upload({
                url: 'upload/artifact',
                data: {user: $scope.user, file: file},
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };
        $scope.addArtifact = function (artifact) {
            console.log('addArtifact', artifact);
            $http.post('/madeit/artifacts', artifact).then(function(response) {
                console.log('addArtifact good', response);
                $scope.artifacts.push(artifact);
                // artifact.category = '';
                // artifact.description = '';
                // artifact.title = '';
                // artifact.asset = '';
                // artifact.comments = '';
                // artifact.creator = '';
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
            $scope.ddValue = '';
            $scope.added = false;
            // load users from db
            $scope.getData('users');
            $scope.getData('artifacts');
        };
        $scope.init();
    }])
    .directive('ddMenu', function() {
        return {
            restrict: 'A',
            scope: {
                value: '='
            },
            link: function(scope, element) {
                // set the initial value
                var $el = $(element);
                //scope.value = $el.find('li:first').text();
                if(scope.value){
                    scope.value = $el.find('li:first').text()
                }
                else{
                    scope.value = '';
                }
                // listen for changes
                $el.on('click', 'li', function() {
                    scope.value = $(this).text();
                    scope.$apply();
                });
            }
        };
    });
