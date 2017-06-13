var express=require('express');
var app=express();
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//var app=require("express")();
/*app.get("/",function(req,res){
    res.send('Hello Miracle');
});*/

var mongodb=require('mongodb');
//we need to work with "mongoclient"
var MongoClient=mongodb.MongoClient;
//connection url
var url='mongodb://localhost:27017/Querydb';

MongoClient.connect(url, function(err,db){
    if(err){
        console.log('unable to connet to mongodb server');
    }
    else{
        console.log('connection establish to ',url);
       

app.get("/in",function(req,res){
    res.sendFile(__dirname+'/'+"index.html");   
});

app.post('/l',function(req,res){
	 var doc = req.body.value;
	var collection=db.collection("sample");
	 collection.find({'_id':doc}).toArray(function(err,data)
	 {
		
		 
		 var val=JSON.stringify(data);
		 var i=JSON.parse(val);
		 
		 //console.log(i);
		 console.log(i[0]._id,i[0]._rev);
		 /*response={
			 name:i.name,
			 address:i.add
		 }*/
		 var data="Name&nbsp&nbsp&nbsp&nbsp:&nbsp<input type=\"text\" id=\"name\" value=\""+i[0].name+"\"/>"+
		 "Address&nbsp:&nbsp<input type=\"text\" id=\"pass\" value=\""+i[0].password+"\"/>"+
		 "<input type=\"hidden\" id=\"revNum\" value=\""+i[0]._rev+"\"/>"+
		 "<input type=\"hidden\" id=\"docId\" value=\""+i[0]._id+"\"/>"+
		 "<input type='button' name='update' id=\"update\" value='UPDATE'>";
		 //console.log(js);
		 
		 
		 if(err)
		 {
			 return err
		 }
		  
res.send(data);
	
	 });
 });


app.post("/insert",function(req,res){
    var x=req.body.uname;
    var y=req.body.pass;
	var z=req.body.docId;
    
    var collection=db.collection("sample");
    //var user2={name:x,password:y};
    collection.insert({'_id':z, 'name':x, 'password':y}, function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log('insert the data successfully..');
			res.redirect("/create");
        }
		
	});
});


app.post("/update",function(req,res)
		{
			//res.sendFile(__dirname+'/'+"update.html");  
			var a=req.body.name;
			var b=req.body.pass;
			var c=req.body.revNum;
			var d=req.body.docId;
			 var collection=db.collection("sample");
			collection.update({'_id':d},{$set:{'name':a,'password':b, '_rev':c}},function(err,result)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						console.log('update successfully...')
						res.send('update successfully...');
					}
				
		
		
        //db.close();
		});
	});
	
	app.post("/delete",function(req,res)
		{
			//res.sendFile(__dirname+'/'+"update.html");  
			var a=req.body.uname;
			//var b=req.body.pass;
			 var collection=db.collection("sample");
			collection.remove({name:a},function(err,result)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						console.log('delete successfully...');
						res.send('delete successfully...');
					}
				
		
		
       
		//db.close();
    });

});
    }
});

    //res.sendFile(__dirname+'/'+"index1.html");   
app.listen(9999,function(){
    console.log("server is running on 9999");
});