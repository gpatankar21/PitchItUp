var con=require('./conn')

function register(tbl_nm,role,data,cb)
{
 var query="insert into "+tbl_nm+" values(NULL,'"+data.nm+"','"+data.unm+"','"+data.pass+"','"+data.city+"','"+data.mno+"','0','"+role+"')"
 
 con.query(query,function(err,result){
    if(err)
        console.log(err)
    else    
        cb(result)    
 })
}
function investor_register(tbl_nm,data,cb)
{
 var query="insert into "+tbl_nm+" values(NULL,'"+data.nm+"','"+data.unm+"','"+data.email+"','"+data.pass+"','"+data.mno+"','"+data.profile+"','0','investor')"
 
 con.query(query,function(err,result){
    if(err)
        console.log(err)
    else    
        cb(result)    
 })
}

function logincheck(data,cb)
{
 var query="select * from register where unm='"+data.unm+"' && pass='"+data.pass+"' && status=1"
 con.query(query,function(err,result){
    if(err)
        console.log(err)
    else    
        cb(result)    
 })
}
function verifyaccount(data,cb)
{
    var q="update register set status=1 where unm='"+data.email+"'";
    con.query(q,function(err,result)
{
    if(err)
    console.log(err);
    else
    cb(result);
});
}
module.exports={logincheck:logincheck,register:register,verifyaccount:verifyaccount,investor_register:investor_register}
