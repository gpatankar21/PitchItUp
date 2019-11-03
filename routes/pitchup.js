var express = require('express');
var router = express.Router();
var usersmodel = require('../models/usersmodel')
var path=require('path')
router.use('/', function(req, res, next) {
    console.log("HERE>>>>>>")
    myuser=req.session.unm
    myuserole=req.session.role	
    if(myuser==undefined || myuserole!='startup')
    {
        console.log("Invalid User. Please Login First, IP tracking")
        res.redirect("/login")
    }	
    next()
    });

router.get('/startup_profile',function(req,res){
    usersmodel.getRegId(myuser,function(result){
        if(result){
            reg_id=result[0].reg_id;
            usersmodel.getstartup(reg_id,function(result)
        {
            if(result)
            {
            console.log(result[0].img)
            res.render('startup_profile',{'data':result[0],'result':'','unm':''})
            }
        })
        }})

})

router.all('/product',function(req,res)
{
    if(req.method=="GET")
    {
    usersmodel.getRegId(myuser,function(result){
        if(result){
            reg_id=result[0].reg_id;
            usersmodel.getstartup(reg_id,function(result)
        {
            if(result[0].status==1)
            {
                usersmodel.getProduct(result[0].startup_id,function(result1)
                {
                    if(result1)
                    {
                    res.render('startup_product',{'result':'','data':result1[0]})       
                    }
                })     
            }
            else
            {        
            res.render('startup_product',{'result':'Your profile is being reviewed and verified. You will recieve an email once the verification is completed.','data':''})   
            }
        })
    }})
    }
    else
    {
        var idea=req.files.idea
        var ideanm=idea.name;
        var des=path.join(__dirname,"../public/uploads/product",ideanm)
        idea.mv(des)
        usersmodel.getRegId(myuser,function(result){
            if(result){
                reg_id=result[0].reg_id;
                usersmodel.getstartup(reg_id,function(result)
            {
                if(result[0])
                {    
                    usersmodel.setproduct(ideanm,result[0].startup_id,function(result1){
                    if(result1)
                    {
                        res.render('startup_product',{'result':'Product Idea uploaded Successfully. Please revisit after few minutes to view your Product','data':''})
                    }
                })        
            }
        })
    }
    })
    }
})
router.all('/profile',function(req,res)
{
  console.log(req.body)
  if(req.method=='GET')
  res.render('pitchup',{'result':''});
  else
  {
      var img=req.files.img
      var data=req.body
      if(img!=undefined)
      {
        var imgnm=img.name;
        var des=path.join(__dirname,"../public/uploads",imgnm)
        img.mv(des)
      }
      else
      {
        var imgnm='dummy.png'
      }  
      usersmodel.getRegId(myuser,function(result){
          if(result){
              reg_id=result[0].reg_id;
              usersmodel.pitchup("startup",reg_id,data,imgnm,function(result){
                if(result)
                {
                    res.render("startup_profile",{"result":"Details submitted successfully,wait for verification.",'unm':myuser})
                }
                else
                {
                  res.render("startup_profile",{"result":"Registration failed."})
                }
            })
          }
      })
     
  }
})

router.get('/register', function(req, res, next) {
  
});

module.exports = router;
