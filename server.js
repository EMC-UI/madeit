const multer = require('multer');

var upload = multer({
    storage: multer.memoryStorage()
});

var mongoAccess = require('./mongo_access');
var dataAccess = require('./dataAccess');

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

app.get('/madeit/users', function (req, res) {
    dataAccess.getUsers(req.query).then(function(result) {
        console.log('http getUsers result', result);
        res.status(200).json(result);
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
        res.status(200).json(result);
    }, function(err) {
        console.log('http post add user err', err);
        res.status(500).json(err);
    });
    // res.status(200).end;
});

app.post('/madeit/emailUser', function (req, res) {
    console.log('post emailUser', result);
});

app.get('/madeit/artifacts', function (req, res) {
    dataAccess.getArtifacts(req.query).then(function(result) {
        console.log('http getArtifacts result', result);
        res.status(200).json(result);
    }, function(err) {
        console.log('http getArtifacts err', err);
        res.status(500).json(err);
    });
     // res.json(artifactsMock.artifacts);
});


app.put('/madeit/artifacts', function (req, res) {
    var artifact = req.body;
    dataAccess.updateArtifact(artifact).then(function(result) {
        console.log('http put updateArtifact db result', result);
        res.status(200);
    }, function(err) {
        console.log('http post artifacts db err', err);
        res.status(500).json(err);
    });

    // res.status(200).end;
});

app.post('/madeit/artifacts', function (req, res) {
    var artifact = req.body;
    delete artifact.image;
    dataAccess.addArtifact(artifact).then(function(result) {
        console.log('http post addArtifact db result', result);
        res.status(200).json(result);
    }, function(err) {
        console.log('http post artifacts db err', err);
        res.status(500).json(err);
    });

    // res.status(200).end;
});

app.get('/madeit/images', function (req, res) {
    var fileName = req.query.fileName;
    console.log('http get /madeit/images fileName', fileName);
    mongoAccess.getFileFromMongo(fileName, function(data) {
        console.log('/madeit/images readFileDone');
        res.json({
            image: data
        })
    });
});

var handleBigPost = function(req, res, next) {
    console.log(' handleBigPost body', req.body);
    console.log('handleBigPost file', req.file);

    // could write to gridFS here, just saving to local arrayimages.push(req.file.buffer.toString('base64'))
    var cfg = {
        filename: req.body.title,
        metadata: req.body.description
    };
    mongoAccess.writeFileToMongo(cfg, req.file.buffer).then(function() {
        console.log('http post handleBigPost good');
        res.status(201).end();
    }, function(err) {
        console.log('http post handleBigPost err');
        res.status(500).json(err);
    });
};

//  curl -i -F file=@/Users/lairdk/aDev/src/hacka/EMC-UI/madeit/assets/img/proj-0.png http://localhost:3000/saveimage -F title='proj-0.png'
app.post('/madeit/images', upload.single('file'), handleBigPost);


app.listen(3000, function () {
    console.log('MADEIT app listening on port 3000!');
});
