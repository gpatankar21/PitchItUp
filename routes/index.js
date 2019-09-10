var express = require('express');
var usersmodel=require('../models/usersmodel');
var testmail=require('./testmail');
var router = express.Router();
var url=require('url');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about',function(req,res,next)
{
  res.render('about',{title: 'Express'});
});

router.all('/pitchup',function(req,res,next)
{
  if(req.method=='GET')
  res.render('pitchup',{result: ''});
  else
  
    usersmodel.register('register','startup',req.body,function(result)
  {
    if(result)
    {
      testmail.mymail(req.body.unm,req.body.pass,function(result1)
      {
        res.render('pitchup',{'result':'Registered successfully, verify your account from Inbox'})
      })
    }
    else
              res.render('pitchup',{'result':'Registered failed, try again'})
      
  });
});

router.get('/verify',function(req,res,next)
{
  var data=url.parse(req.url,true).query;
  usersmodel.verifyaccount(data,function(result)
{
  res.redirect('/login');
});
});
router.get('/contact',function(req,res,next)
{
  res.render('contact',{title: 'Express'});
});

router.get('/profile',function(req,res)
{
  console.log(req.body)
  res.render('profile');
})

router.all('/login',function(req,res,next)
{
  if(req.method=='GET')
  res.render('login',{data: ''});
  else
  {
    usersmodel.logincheck(req.body,function(result)
  {
    if(result.length>0)
    {
      if(result[0].role=='startup')
      res.redirect('/profile')
      
      else if(result[0].role=='investor')
      res.redirect('/invest/profile')

      else
      res.redirect('/admin/profile')
    }
    else
    {
      res.render('login',{data:'Invalid Username/Password OR Unverified User'})
    }
  })
  }
});

router.get('/register',function(req,res,next)
{
  res.render('register',{title: 'Express'});
});
module.exports = router;
