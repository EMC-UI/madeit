var mongodb = require('mongodb');
var bluebird = require('bluebird');
var mongoClient = bluebird.promisifyAll(mongodb).MongoClient;
var dbName = 'caveman';
var defaultDBConnection = 'mongodb://localhost:27017/' + dbName;

var Grid = require('gridfs');

var writeFileToMongo = function (cfg, buffer) {
    return mongoClient.connect(defaultDBConnection).then(function(db) {
        var gfs = Grid(db, mongodb);
        gfs.writeFile(cfg, buffer, function(err,file) {
            console.log(err,file);
        });
    }, function(err){
        console.log('writeFileToMongo err', err);
    });
};

var getFileFromMongo = function (fileName, callback) {
    mongodb.MongoClient.connect(defaultDBConnection, function (err, db) {
        var gfs = Grid(db, mongodb);
        gfs.readFile({filename: fileName}, function (err, data) {
            console.log('read file %s: %s', fileName);
            if (data) {
                callback(data.toString('base64'));
            }
        });
    });
};

module.exports = {
    writeFileToMongo: writeFileToMongo,
    getFileFromMongo: getFileFromMongo
};