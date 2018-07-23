// npm install firebase

// ref: https://firebase.google.com/docs/database/web/read-and-write

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const firebase = require('firebase')
const uuidv4 = require('uuid/v4')
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
  //------registered---------------
  router.post('/registered', function (req, res, next) {
      const account = req.body.account
      const password = req.body.password
      // 試著判斷前端在request中是否有正常的輸入request的key。
      if (account === undefined || password === undefined || account === '' || password === '') {
          res.status(400).json({
              result: '請在request的輸入name及password的key值。'
          })
          // 若沒加該行return會造成一個重複給response中的錯誤
          return
      }
      firebase.database().ref('registereds/' + uuidv4()).set({
          account: req.body.account,
          password: req.body.password
      });
      res.status(200).json({
          result: '帳號新增成功'
      })
  })

  router.post('/sign_in', function (req, res, next) {
    const account = req.body.account
    const password = req.body.password
    if (account === undefined || password === undefined || account === '' || password === '') {
        res.status(400).json({
            result: '請在request的輸入name及password的key值。'
        })
          // 若沒加該行return會造成一個重複給response中的錯誤
           return
       }

       // 帳號確認
       firebase.database().ref('registereds/').orderByChild('account').equalTo(account).on('value', function (snapshot) {
           if (snapshot.val() === null) {
               res.json({
                   result: '無該帳號'
               })
               return
           }
           const token = jwt.sign({
               exp: Math.floor(Date.now() / 1000) + (60 * 60),
               data: account
             }, 'secret');

           const decoded = jwt.verify(token, 'secret');

           res.json({
               token
           })
       });
     })

  router.post('/order', function (req, res, next) {
      const productName = req.body.productName
      const quantity = req.body.quantity
      const token = req.query.token
      // 試著判斷前端在request中是否有正常的輸入request的key。
      if (productName === undefined || quantity === undefined || token === undefined || productName === '' || quantity === '' || token === '') {
          res.status(400).json({
              result: '請在request的body中輸入name及price的key值，並在query中輸入token值。'
          })
          // 若沒加該行return會造成一個重複給response中的錯誤
          return
      }
      const decoded = jwt.verify(token, 'secret');
      const account = decoded.data

      firebase.database().ref('orders/' + uuidv4()).set({
          account,
          productName,
          quantity,
      });
      res.status(200).json({
         result: '產品新增成功'
      })
 })

 router.put('/order', function (req, res, next) {
     const productName = req.body.productName
     const quantity = req.body.quantity
     const token = req.query.token
     // 試著判斷前端在request中是否有正常的輸入request的key。
     if (productName === undefined || quantity === undefined || token === undefined || productName === '' || quantity === '' || token === '') {
         res.status(400).json({
             result: '請在request的body中輸入name及price的key值，並在query中輸入token值。'
         })
         // 若沒加該行return會造成一個重複給response中的錯誤
         return
     }
     const decoded = jwt.verify(token, 'secret');
     const account = decoded.data

     firebase.database().ref('orders/' + uuidv4()).set({
         account,
         productName,
         quantity,
     });
     res.status(200).json({
        result: '產品修改成功'
     })
})

router.delete('/order', function (req, res, next) {
    const token = req.query.token
    // 試著判斷前端在request中是否有正常的輸入request的key。
    if (productName === undefined || quantity === undefined || token === undefined || productName === '' || quantity === '' || token === '') {
        res.status(400).json({
            result: '請在request的body中輸入name及price的key值，並在query中輸入token值。'
        })
        // 若沒加該行return會造成一個重複給response中的錯誤
        return
    }
    const decoded = jwt.verify(token, 'secret');
    const account = decoded.data

    firebase.database().ref('orders/' + uuidv4()).remove();
    res.status(200).json({
       result: '產品刪除成功'
    })
})

//--
//----------------------------------------------------------------------

router.post('/product', function (req, res, next) {
    const name = req.body.name
    const price = req.body.price
    // 試著判斷前端在request中是否有正常的輸入request的key。
    if (name === undefined || price === undefined || name === '' || price === '') {
        res.status(400).json({
            result: '請在request的輸入name及price的key值。'
        })
        // 若沒加該行return會造成一個重複給response中的錯誤
        return
    }
    firebase.database().ref('products/' + uuidv4()).set({
        name: req.body.name,
        price: req.body.price
    });
    res.status(200).json({
        result: '產品新增成功'
    })
})

// + GET - 提取所有產品資料（包含產品名稱、價格）
router.get('/product/all', function (req, res, next) {

    firebase.database().ref('products/').once('value', function (snapshot) {
        // console.log(snapshot.val());
        res.status(200).json({
            result: snapshot.val()
        })
    });
})

// + GET - 提取單一產品資料（包含產品名稱、價格）
router.get('/product', function (req, res, next) {
    // console.log('query value: ', req.query.id)
    const id = req.query.id
    if (id === undefined || id === '') {
        res.status(400).json({
            result: '請在request的輸入id的query值。'
        })
        // 若沒加該行return會造成一個重複給response中的錯誤
        return
    }
    firebase.database().ref('products/' + id).once('value', function (snapshot) {
        // console.log(snapshot.val());
        res.status(200).json({
            result: snapshot.val()
        })
    });
})

// + PUT - 更改產品（可選擇只修改產品名稱或只修改價格）
router.put('/product', function (req, res, next) {
    const id = req.query.id
    const name = req.body.name
    const price = req.body.price
    // 試著判斷前端在request中是否有正常的輸入request的key。
    if (id === undefined|| id === '') {
        res.status(400).json({
            result: '請在query中輸入id值。'
        })
        // 若沒加該行return會造成一個重複給response中的錯誤
        return
    }
    firebase.database().ref('products/' + id).update({
        name: name,
        price: price
    });
    res.json({
        result: '修改成功'
    })
})

// + DELETE - 刪除產品
router.delete('/product', function (req, res, next) {
    const id = req.query.id
    if (id === undefined|| id === '') {
        res.status(400).json({
            result: '請在query中輸入id值。'
        })
        // 若沒加該行return會造成一個重複給response中的錯誤
        return
    }
    // remove -> 刪除指定users中指定對象的資料
    firebase.database().ref('products/' + id).remove()
    res.json({
        result: '刪除成功'
    })
})

//--------------------------------------------------------------------
//--------------------------------------------------------------------

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
