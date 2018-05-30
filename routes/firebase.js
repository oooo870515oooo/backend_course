// npm install firebase

// ref: https://firebase.google.com/docs/database/web/read-and-write

var express = require('express');
var router = express.Router();

const firebase = require('firebase')

router.get('/', function (req, res, next) {

    var config = {
        databaseURL: "https://cool-5c141.firebaseio.com"
    };

    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();

    firebase.database().ref('users/' + '123').set({
        username: 'wwwww',
        email: 'test@gmail.com'
    });

    firebase.database().ref('users/' + '223').update({
        username: 'wwwww',
        email: 'tes2t@gmail.com'
    });

    // get data
    firebase.database().ref('users/').once('value', function (snapshot) {
        console.log(snapshot.val());
        res.json({
          
        })
    });

    // firebase.database().ref('users/' + '123').remove()

});

module.exports = router;
