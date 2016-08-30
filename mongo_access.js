var mongodb = require('mongodb');
var fs = require('fs');
var Grid = require('gridfs');
var dbName = 'caveman';
var defaultDBConnection = 'mongodb://128.222.174.194/' + dbName;

var writeFileToMongo = function (filePath) {
    mongodb.MongoClient.connect(defaultDBConnection, function(err, db) {
        var pos = filePath.lastIndexOf("/");
        var fileName = filePath.substring(pos + 1);
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
                fileNames.push(filename);
            });
            callback(fileNames);
        })
    });
};

var getFileFromMongo = function (fileName, callback) {
    mongodb.MongoClient.connect(defaultDBConnection, function (err, db) {
        var gfs = Grid(db, mongodb);
        gfs.readFile({filename: fileName}, function (err, data) {
            // console.log('read file %s: %s', fileName, data.toString());
            callback(data.toString('base64'));
        });
    });
};


module.exports = {
    writeFileToMongo: writeFileToMongo,
    getListOfMongoFiles: getListOfMongoFiles,
    getFileFromMongo: getFileFromMongo
}