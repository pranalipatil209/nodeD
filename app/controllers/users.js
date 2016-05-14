var express = require('express')
    ,app = express()
    ,router = express.Router()
    ,event = require('events').EventEmitter
    ,userList = require('../model/users')
    ,user = new userList()

//return all users
router.get('/get',function(req,res,next){
  user.all(function(data){
    res.send(data);
  });
});

//save user
router.post('/save',function(req,res){
  console.log('inside save controller');
 var data={
    fullname:req.body.fullname,
    gender:req.body.gender,
    company:req.body.company,
    technology:req.body.technology
 };
  console.log(data);
  // display saved user
  var resps = user.save(data,function(error,data){
    if(error) {
      res.send(error)
    }
    else {
      res.send(data)
    }
  });
});

//event listener for user save
user.on('userSave',function(){
  console.log('User has been saved!');
});

module.exports = router;
