'use strict';

angular.module('app', ['ngMessages','ui.bootstrap','ngFileUpload'])
    .run(['$rootScope', function($rootScope) {
    }])

    .controller('mainCtrl', ['$scope', '$http', '$q', 'FileUploadSvc',  function ($scope, $http, $q, fileUploadSvc) {
        var resetArtifact = function() {
            $scope.imageLoaded = false;
            $scope.artifact = {
                category : 'Art',
                title : '',
                description : '',
                creator : '',
                imageName: '',
                image: '',
                comments: []
            };
        };

        $scope.artifacts = [];
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
        $scope.saveComment = function(item, newComment){
            item.comments.push(newComment);
            $scope.newComment='';
            $scope.updateArtifact(item);
        };

        $scope.filterArtifact = function (data) {
            $scope.getData('artifacts', {category: data});

            // $http.post('/madeit/email',
            //     {data: {email: '7205601915@tmomail.net', msg:'test'}}).then(function(response) {
            //     console.log('emailUser good', response);
            // }, function(err) {
            //     console.log('emailUser err', err);
            // });
        };

        var uploadRequestPromise;
        $scope.imageLoaded = false;

        $scope.getImage = function(fileName, callback) {
            uploadRequestPromise = fileUploadSvc.getImage(fileName);
            $q.when(uploadRequestPromise).then(function(result) {
                console.log('getImage OK', result);
                callback(result.data.image);
            }, function(err) {
                console.log('getImage err', err);
            });
        };

        $scope.uploadImage = function() {
            $scope.imageLoaded = false;
            $scope.artifact.imageName = '';
            $scope.artifact.image = '';

            var elem = angular.element(document.getElementById('fileInputElement'));
            // no need to read the bytes in from the file
            var file = elem[0].files[0];
            $scope.artifact.imageName = file.name;
            console.log('uploadImage file=', file);

            uploadRequestPromise = fileUploadSvc.uploadImage(file);
            $q.when(uploadRequestPromise).then(function(result) {
                console.log('uploadImage OK', result);
                // $scope.getImage($scope.artifact.imageName, $scope.artifact.image);
                $scope.getImage($scope.artifact.imageName, function(result) {
                    $scope.artifact.image = result;
                    $scope.imageLoaded = true;
                });
            }, function(err) {
                $scope.imageLoaded = false;
                $scope.artifact.imageName = '';
                $scope.artifact.image = '';
                console.log('uploadImage err', err);
            });
        };

        $scope.updateArtifact = function (artifact) {
            console.log('updateArtifact', artifact);
            $http.put('/madeit/artifacts', artifact).then(function(response) {
                console.log('updateArtifact good', response);
                // $scope.artifacts.push(artifact);
            }, function(err) {
                console.log('updateArtifact err', err);
            });
        };

        $scope.addArtifact = function (artifact) {
            console.log('addArtifact', artifact);
            artifact.comments = [artifact.oneComment];
            delete artifact.oneComment;
            $http.post('/madeit/artifacts', artifact).then(function(response) {
                console.log('addArtifact good', response);
                response.data.image = artifact.image;
                $scope.artifacts.push(response.data);
                resetArtifact();
            }, function(err) {
                console.log('addArtifact err', err);
            });
        };

        $scope.addUser = function (user) {
            console.log('addUser', user);
            $http.post('/madeit/users', user).then(function(response) {
                console.log('addUser good', response);
                $scope.users.push(response.data);
                $scope.user = {};
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

        var loadArtifacts = function(params) {
            $scope.getData();
            $http.get('/madeit/artifacts', params ? {params: params} : {}).then(function (response) {
                $scope.artifacts = response.data;
                _.each($scope.artifacts, function(artifact) {
                    artifact.image = '';
                    $scope.getImage(artifact.imageName, function(result) {
                        artifact.image = result;
                    });
                });
                console.log('loadArtifacts', resourceName, response, $scope[resourceName]);
            }, function (err) {
                console.log('loadArtifacts err', resourceName, err);
            });
        };

        $scope.init = function () {
            resetArtifact();
            $scope.ddValue = '';
            // load users from db
            $scope.getData('users');
            loadArtifacts();
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
