var nodemailer=require('nodemailer');
var express=require('express');
var router=express.Router();
function mymail(email,pass,cb)
{
    console.log(email)
    var transporter=nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user:'fulfillingtheneeds@gmail.com', 
            pass:'Fulfill@123'
        },
        tls: {
            rejectUnauthorized:false
        }
    });

    var mailoptions={
        from:'fulfillingtheneeds@gmail.com',
        to:email,
        subject: 'verification',
        html: "<h1>Welcome to PitchItUp.com please click on the link below to verify yourself.<br>Your login credentials are <br><br> Username: "+email+"<br>Password: "+pass+"<br>Click on the link given below to verify your account:<br> http://localhost:3000/verify?email="+email};
    

    transporter.sendMail(mailoptions,function(err,info)
{
    if(err)
    console.log(err)
    else
    cb(true);
});
}
module.exports={mymail:mymail}