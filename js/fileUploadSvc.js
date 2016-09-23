/**
 * Created by lairdk on 9/19/16.
 */
angular.module('app')
    .factory('FileUploadSvc', ['$http', function ($http) {

        console.log('FileLoadControllerinit');

        var getImage = function (fileName) {
            return $http.get('/madeit/images?fileName=' + fileName);
        };

        var uploadImage = function(file) {
            console.log('uploadImage');

            // just append the file to the form data, along with other form fields
            var fd = new FormData();
            fd.append('file', file);
            fd.append('title', file.name);
            fd.append('description', file.name);

            return $http.post('/madeit/images', fd, {
                // this is required for multi-part form
                headers: {
                    'Content-Type': undefined
                }
            });
        };

        return {
            uploadImage: uploadImage,
            getImage: getImage
        }
    }]);