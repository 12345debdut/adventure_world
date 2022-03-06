var express = require('express');
var router = express.Router();
//var admincontroller = require('../controllers/admincontroller')
// var usercontroller = require('../controllers/usercontroller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',{
    package:[],
    name:req.session.name,
    authenticated:req.session.authenticated,
    admin:req.session.admin
  });
});

router.get('/user/userreg', function(req, res, next) {
  if(req.session.name!==undefined)
  {
    res.redirect('/user/userhome')
  }else{
    res.render('./userpart/userreg',{error:req.query.error});
  }
});

// router.post('/user/userregdbinsert', usercontroller.userregistration );

router.get('/user/userlogin', function(req, res, next) {
  res.render('./userpart/userlogin',{error:req.query.error});
});
router.get('/user/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/error',(req,res)=>{
  res.render('./error/error')
})
router.get('/', function(req, res, next) {
  res.render('home');
});



module.exports = router;