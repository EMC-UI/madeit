var mongoAccess = require('./mongo_access');
var dataAccess = require('./dataAccess');

// var mongodb = require('mongodb');
// var fs = require('fs');
// var Grid = require('gridfs');
// var dbName = 'caveman';
// var defaultDBConnection = `mongodb://128.222.174.194/${dbName}`;
// var filePath = './assets/img/screenshot.png';

var express = require('express');
var bodyParser = require("body-parser");

var app = express();

//Here we are configuring express to find its filess.
app.use(express.static('.'));
app.use(express.static('./assets'));

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));


var url = require('url');
var usersMock = require('./mock/users.json');
var artifactsMock = require('./mock/artifacts.json');

// mongodb.MongoClient.connect(defaultDBConnection, function(err, db) {
//     var pos = filePath.lastIndexOf("/");
//     var fileName = filePath.substring(pos + 1);
//     var gfs = Grid(db, mongodb);
//     gfs.list(db, function (err, files) {
//         files.forEach(function(filename) {
//             console.log("Found the following file names %s", filename);
//         })
//     })
// });

app.get('/madeit/users', function (req, res) {
    dataAccess.getUsers(req.query).then(function(result) {
        console.log('http getUsers result', result);
        res.json(result);
    }, function(err) {
        console.log('http getUsers err', err);
        res.status(500).json(err);
    });
    // res.json(usersMock.users);
});

app.post('/madeit/users', function (req, res) {
    var user = req.body;
    dataAccess.addUser(user).then(function(result) {
        console.log('http post add user result', result);
        res.json(result);
    }, function(err) {
        console.log('http post add user err', err);
        res.status(500).json(err);
    });

    // res.status(304).json({status:304 });
    // res.status(200);
});

app.post('/madeit/emailUser', function (req, res) {
    console.log('post emailUser', result);
});

app.get('/madeit/artifacts', function (req, res) {
    // dataAccess.getArtifacts(req.query).then(function(result) {
    //     console.log('http getArtifacts result', result);
    //     res.json(result);
    // }, function(err) {
    //     console.log('http getArtifacts err', err);
    //     res.status(500).json(err);
    // });
     res.json(artifactsMock.artifacts);
});

app.post('/madeit/artifacts', function (req, res) {
    var artifact = req.body;
    dataAccess.addArtifact(artifact).then(function(result) {
        console.log('http post artifacts db result', result);
        res.json(result);
    }, function(err) {
        console.log('http post artifacts db err', err);
        res.status(500).json(err);
    });

    // res.status(200).end;
});

app.listen(3000, function () {
    console.log('MADEIT app listening on port 3000!');
});
