/**
 * Created by lairdk on 9/19/16.
 */
angular.module('app')
    .controller('FileUploadController', ['$scope', '$http', function ($scope, $http) {

        var vm = this;
        console.log('FileLoadControllerinit');

        vm.loadImages = function (fileName) {
            $http.get('/madeit/images?fileName=' + fileName)
                .success(function (response) {
                    $scope.images = [response.images];
                })
                .error(function (err) {
                    console.log('error getting images', err);
                });
        };

        $scope.uploadImage = function () {
            console.log('uploadImage');

            // grab the element , this should really be done in a directive
            var elem = angular.element(document.getElementById('fileInputElement'));

            // no need to read the bytes in from the file
            var file = elem[0].files[0];

            var fd = new FormData();

            // just append the file to the form data, along with other form fields
            fd.append('file', file);
            fd.append('title', file.name);
            fd.append('description', file.name);

            // then post the form data (this should be a separate service)
            $http.post('/madeit/images', fd, {
                // this is required for multi-part form
                headers: {
                    'Content-Type': undefined
                }
            }).success(function () {
                console.log('uploadImage success');
                vm.loadImages(file.name);
            }).error(function (err) {
                console.log('uploadImage error');
            });
        };
    }]);