var express = require('express');
var router = express.Router();

router.use('/',function (req, res, next) {
    const onTime = new Date()
    console.log(onTime)
    next()
  })

/* GET home page. */

router.get('/', function(req, res, next) {
res.json = JSON({
    say: 'hi',
    no: 'no~~',
  });
});

router.post('/test', function(req, res, next) {
  console.log(req.body)
res.json({
    result:req.body
  })
});

router.put('/test2', function(req, res, next) {
  console.log('hi,i m wz.')
  console.log(req.body)
res.json({
    result:req.body
  })
});

router.delete('/test3', function(req, res, next) {
  console.log('hi,i m wz.')
  console.log(req.body)
res.json({
    result:req.body
  })
});



module.exports = router;
