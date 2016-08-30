var pmongo = require('promised-mongo');
var await = require('asyncawait/await');
var async = require('asyncawait/async');

var getDbConnection = function () {
    return pmongo('mongodb://localhost:27017/caveman');
};

var db = getDbConnection();

var addUser = function(user) {
    // console.log('addUser', user);
    return db.collection('users').insert(user).then(function (result) {
        console.log('db.addUser good: ', result);
        return 200;
    });
    // .catch(function (err) {
    //     console.log('addUser error: ', err);
    //     return err;
    // });
};

var getUsers = function(params) {
    console.log('getUsers', params);
    return db.collection('users').find().then(function (result) {
        console.log('db.getUsers good: ', result);
        return result;
    }).catch(function (err) {
        console.log('db.getUsers error: ', err);
    });
};

var addArtifact = function(artifact) {
    console.log('db.addArtifact', artifact);
    return db.collection('artifacts').insert(artifact).then(function (result) {
        console.log('db.addArtifact good: ', result);
        return 200;
    })
};

var getArtifacts = function(params) {
    console.log('getArtifacts', params);
    return db.collection('artifacts').find(params).then(function (result) {
        console.log('db.getArtifacts good: ', result);
        return result;
    }).catch(function (err) {
        console.log('db.getArtifacts error: ', err);
    });
};

module.exports = {
    addUser: addUser,
    getUsers: getUsers,
    getArtifacts: getArtifacts,
    addArtifact: addArtifact
};

