var express=require('express');
var usersmodel=require('../models/usersmodel');
var router=express.Router();
var testmail=require('./testmail')
router.all('/',function(req,res,next)
{   if(req.method=='GET')
    res.render('invest',{'data':''});
    else
    {
    usersmodel.register('register','investor',req.body,function(result)
  {
    if(result)
    {
      testmail.mymail(req.body.unm,req.body.pass,function(result1)
      {
        res.render("invest",{'data':'Registered Successfully verify your account from the inbox'})
      })
    }
    else
    {
      res.render("invest",{'data':'Registration failed'})
    }
  }) 
      
    }
});

router.get('/profile',function(req,res)
{
  res.render('investprofile');
})

module.exports=router;