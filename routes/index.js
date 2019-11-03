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
  res.render('register',{'data': 'startup','result':''});
  else
   { 
    usersmodel.register('register','startup',req.body,function(result)
  {
    if(result)
    {
      testmail.mymail(req.body.email,req.body.pass,function(result1)
      {
        res.render('register',{'data':'startup','result':'Registered successfully, verify your account from Inbox'})
      })
    }
    else
              res.render('register',{'data':'','result':'Registered failed, try again'})
      
  });
 }
});
router.all('/invest',function(req,res,next)
{   if(req.method=='GET')
    res.render('register',{'data':'investor','result':''});
    else
    {
    usersmodel.register('register','investor',req.body,function(result)
  {
    if(result)
    {
      testmail.mymail(req.body.unm,req.body.pass,function(result1)
      {
        res.render("invest",{'data':'','result':'Registered Successfully verify your account from the inbox'})
      })
    }
    else
    {
      res.render("invest",{'data':'','result':'Registration failed'})
    }
  }) 
      
    }
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

router.all('/login',function(req,res,next)
{
  req.session.unm=req.body.unm
  if(req.method=='GET')
  res.render('login',{data: ''});
  else
  {
    usersmodel.logincheck(req.body,function(result)
  {
    if(result.length>0)
    {
      req.session.role=result[0].role
      if(result[0].role=='startup')
      {
      usersmodel.getRegId(req.body.unm,function(result){
        if(result)
        {
          reg_id=result[0].reg_id
          usersmodel.getstartup(reg_id,function(result){
            if(result[0])
            {
              res.redirect("/pitchup/startup_profile")
            }
            else
            {
              res.redirect('/pitchup/profile')
            }
          })
        }
      })  
     
      }
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
router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/login')
});
router.get('/register',function(req,res,next)
{
  res.render('register',{title: 'Express'});
});
module.exports = router;
