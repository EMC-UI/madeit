var mongodb = require('mongodb');
var fs = require('fs');
var Grid = require('gridfs');
var dbName = 'caveman';
var defaultDBConnection = `mongodb://128.222.174.194/${dbName}`;

var writeFileToMongo = function (filePath) {
    mongodb.MongoClient.connect(defaultDBConnection, function(err, db) {
        var pos = filePath.lastIndexOf("/");
        var fileName = filePath.substring(pos);
        var gfs = Grid(db, mongodb);
        gfs.fromFile({filename: fileName}, filePath, function (err, file) {
            console.log('saved %s to GridFS file %s', filePath, file.filename);
        });
    });
};

var getListOfMongoFiles = function(callback) {
    var fileNames = [];
    mongodb.MongoClient.connect(defaultDBConnection, function (err, db) {
        var gfs = Grid(db, mongodb);
        gfs.list(function (err, files) {
            files.forEach(function(filename) {
                //console.log("file name found = " + filename);
                fileNames.push(filename);
            });
            callback(fileNames);
        })
    });
};

var getFileFromMongo = function (fileName) {
    //     mongoClient.connect(dbURI).then(ddb => {
    //         console.log('connected to mongo');
    //     db = ddb;
    //     var bucket = new mongodb.GridFSBucket(db, {bucketName: bucketName});
    //     var cursor = bucket.find();
    //
    //     //iterate through cursor and return files....
    // })
};



// this.readFilesFromMongo = function () {
//     mongoClient.connect(dbURI).then(ddb => {
//         console.log('connected to mongo');
//     db = ddb;
//     var bucket = new mongodb.GridFSBucket(db, { bucketName: bucketName });
// }
// };



//     uploadStream.once('finish', function() {
// //now read it back
//         bucket.openDownloadStreamByName('hs-2015-02-a-full_jpg.jpg').
//         pipe(fs.createWriteStream('./assets/img/gotFromMongo.jpg')).
//         on('error', function(error) {
//             assert.ifError(error);
//         }).
//         on('finish', function() {
//             console.log('done!');
//             process.exit(0);
//         });
//     });
//
//     readStream.pipe(uploadStream);
//



//     }).catch(er => {
//         console.log('error connecting to mongo', er);
// });
//     //
//
// };
//
module.exports = {
    writeFileToMongo: writeFileToMongo,
    getListOfMongoFiles: getListOfMongoFiles
}