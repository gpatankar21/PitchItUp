var con=require('./conn')

function register(tbl_nm,role,data,cb)
{
 var query="insert into "+tbl_nm+" values(NULL,'"+data.email+"','"+data.unm+"','"+data.pass+"','"+data.contact+"','0','"+role+"')"
 
 con.query(query,function(err,result){
    if(err)
        console.log(err)
    else    
        cb(result)    
 })
}

function getstartup(reg_id,cb)
{
    var q="select * from startup where reg_id='"+reg_id+"'"
    con.query(q,function(err,res)
    {
        console.log(res)
        if(err)
        console.log(err)
        else
        cb(res)
    })
}

function getProduct(startup_id,cb)
{
    var q="select * from product where startup_id='"+startup_id+"'"
    con.query(q,function(err,res)
    {
        console.log(res)
        if(err)
        console.log(err)
        else
        cb(res)
    })   
}
function getRegId(unm,cb)
{
    var q="select * from register where unm='"+unm+"'"
    con.query(q,function(err,res)
    {
        console.log(res)
        if(err)
        console.log(err)
        else
        cb(res)
    })
}
function pitchup(tbl_nm,reg_id,data,imgnm,cb)
{
    console.log("reg_id:",reg_id)
    var query="insert into "+tbl_nm+" values(NULL,'"+data.nm+"','"+data.location+"','"+data.c_size+"','"+data.m_cat+"','"+data.bio+"','"+data.ceo+"','"+data.gstin+"','"+imgnm+"','0','"+reg_id+"')"
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

function setproduct(ideanm,startup_id,cb)
{
    var query="insert into product"+" values(NULL,'"+startup_id+"','"+ideanm+"')"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else    
            cb(result)    
     })
}
function verifyaccount(data,cb)
{
    var q="update register set status=1 where email='"+data.email+"'";
    con.query(q,function(err,result)
{
    if(err)
    console.log(err);
    else
    cb(result);
});
}
module.exports={logincheck:logincheck,register:register,verifyaccount:verifyaccount,investor_register:investor_register,pitchup:pitchup,getRegId:getRegId,getstartup:getstartup,getProduct:getProduct,setproduct:setproduct}
