'use strict';

angular.module('app', ['ngMessages','ui.bootstrap','ngFileUpload'])
    .run(['$rootScope', '$interval', function($rootScope, $interval) {

    }])

    .controller('mainCtrl', ['$scope', '$http', '$rootScope', '$interval', '$timeout', 'Upload', function ($scope, $http, $rootScope, $interval, $timeout, Upload) {
        $scope.artifacts = [];
        $scope.artifact = {};
        $scope.users = [];
        $scope.user = {};

        $scope.categoryFilter = '';

        $scope.items = [];

        $scope.toggleActiveItem = function(item) {
            if ($scope.active === item) {
                $scope.active = false;
            } else {
                $scope.active = item;
            }
        };

        $scope.showCommentPanel = false;
        $scope.toggleCommentPanel = function() {
            $scope.showCommentPanel = !$scope.showCommentPanel;
        };

        $scope.newComment='';
        $scope.saveComment = function(item,newComment){
            item.comments.push(newComment);
            $scope.newComment='';
        };

        $scope.notifyUsers = function () {
            console.log('notifyUsers');
        };

        $scope.$watch('artifacts', function (newValue, oldValue) {
            $scope.notifyUsers();
        });
        //
        // $scope.search = function (artifacts) {
        //     console.log('search 1111');
        //     if($scope.query != null){
        //         return !!((artifacts.description.indexOf($scope.query || '') !== -1 || artifacts.title.indexOf($scope.query || '') !== -1));
        //     }
        // };

        // $scope.resetSearch = function(){
        //     console.log('resetSearch');
        //     $scope.ddValue = '';
        // };

        $scope.filterArtifact = function (data) {
            $scope.getData('artifacts', {category: data});

            // $http.post('/madeit/email',
            //     {data: {email: '7205601915@tmomail.net', msg:'test'}}).then(function(response) {
            //     console.log('emailUser good', response);
            // }, function(err) {
            //     console.log('emailUser err', err);
            // });
        };

        $scope.addArtifact = function (artifact) {
            console.log('addArtifact', artifact);
            $http.post('/madeit/artifacts', artifact).then(function(response) {
                console.log('addArtifact good', response);
                $scope.artifacts.push(artifact);
                artifact.category = '';
                artifact.description = '';
                artifact.title = '';
                artifact.asset = '';
                artifact.comments = '';
                artifact.creator = '';
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

        $scope.getData = function (resourceName, params) {
            params = params || {};
            console.log('ctrl.getData', arguments);
            $http.get('/madeit/' + resourceName, params ? {params: params} : {}).then(function (response) {
                $scope[resourceName] = response.data;
                console.log('getData', resourceName, response, $scope[resourceName]);
            }, function (err) {
                console.log('getData err', resourceName, err);
            });
        };

        $scope.init = function () {
            $scope.ddValue = '';
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
