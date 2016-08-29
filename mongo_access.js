var mongodb = require('mongodb');
var fs = require('fs');

var MongoDataAccess = function () {

    var dbName = 'caveman';
    var bucketName = 'media_bucket'
    var defaultDBConnection = `mongodb://128.222.174.194/${dbName}`;

    let mongoClient = mongodb.MongoClient;
    let port = process.env.PORT || 5000;
    let dbURI = process.env.MONGODB_URI || defaultDBConnection;
    let db;

    this.writeFileToMongo = function (filePath) {
        mongoClient.connect(dbURI).then(ddb => {
            console.log('connected to mongo');
        db = ddb;
        var bucket = new mongodb.GridFSBucket(db, {bucketName: bucketName});

        //parse file name -
        var fileName = "";
        fs.createReadStream(filePath).pipe(bucket.openUploadStream(fileName)).on('error', function (error) {
            assert.ifError(error);
        }).on('finish', function () {
            console.log('done!');
            process.exit(0);

        })
    })
    };

    this.readFromMongo = function () {
        mongoClient.connect(dbURI).then(ddb => {
            console.log('connected to mongo');
        db = ddb;
        var bucket = new mongodb.GridFSBucket(db, {bucketName: bucketName});
        var cursor = bucket.find();

        //iterate through cursor and return files....
    })
    };
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
// module.exports = MongoDataAccess;