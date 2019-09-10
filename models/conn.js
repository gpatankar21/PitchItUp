var mysql=require('mysql')

var con=mysql.createConnection({
	host:'localhost',
	user:'root',
	database:'pitchitup'
})

con.connect(function(err){
	if(err)
		console.log(err)
	else	
		console.log('Connection done!!!')	
})

module.exports=con
