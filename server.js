var express = require('express');
// var tally = require('tally');
var app = express();
var url = require('url');
var usersMock = require('./mock/users.json');
var artifactsMock = require('./mock/artifacts.json');

app.get('/madeit/users', function (req, res) {
    // var urlParts = url.parse(req.url, true);
    // tally.userStats(urlParts.query.prevDays).then(function(result) {
    //     res.json(result);
    // });
    res.json(usersMock);
});

app.get('/madeit/artifacts', function (req, res) {
    // var urlParts = url.parse(req.url, true);
    // tally.projectStats(urlParts.query.prevDays).then(function(result) {
    //     res.json(result);
    // });
    res.json(artifactsMock);
});

// app.get('/create', function(req, res) {
//     tally.createData(30);
//     res.send('building');
// });

app.listen(3000, function () {
    console.log('MADEIT app listening on port 3000!');
});

app.use(express.static('.'));
