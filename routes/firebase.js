// npm install firebase

// ref: https://firebase.google.com/docs/database/web/read-and-write

var express = require('express');
var router = express.Router();

const firebase = require('firebase')

// set middleware
router.use('/',function (req, res, next) {
    const onTime = new Date()
    console.log(onTime)
    next()
  })

  var config = {
      databaseURL: "https://project-44b8b.firebaseio.com" // enter your databaseURL（輸入由firebase中申請到的firebase的databaseURL）
  };

  firebase.initializeApp(config);

router.get('/getdata', function (req, res, next) {
    firebase.database().ref('users/').once('value',function (snapshot){
      console.log(snapshot.val());
      res.status(206).json({
        result:snapshot.val()
      })
    });
  })

router.post('/postdata', function(req, res, next) {
      firebase.database().ref('users/' + '123').set({
          username: req.body.username,
          email: req.body.email
      });
    res.json({
        result:'已完成註冊'
      })
    });

    router.put('/putdata', function(req, res, next) {
          firebase.database().ref('users/' + '124').update({
              username: req.body.username,
              email: req.body.email
          });
        res.json({
            result:'已更新'
          })
        });

    router.delete('/deletedata', function(req, res, next) {
            firebase.database().ref('users/' + '124').remove()
          res.json({
              result:'已刪除'
            })
          });






router.get('/', function (req, res, next) {
    // Get a reference to the database service
    var database = firebase.database();
    // update -> 更新指定資料
    firebase.database().ref('users/' + '223').update({
        username: 'ooooo',
        email: 'tes2t@gmail.com'
    });



    // once -> 取得資料
    firebase.database().ref('users/').once('value', function (snapshot) {
        console.log(snapshot.val());
        res.json({

        })
    });

    // remove -> 刪除指定資料
    firebase.database().ref('users/' + '123').remove()

});
module.exports = router;
