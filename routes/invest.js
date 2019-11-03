var express=require('express');
var usersmodel=require('../models/usersmodel');
var router=express.Router();
var testmail=require('./testmail')


router.get('/profile',function(req,res)
{
  res.render('investprofile');
})

module.exports=router;