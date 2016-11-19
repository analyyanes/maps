var express=require('express');
var app=express();
var http=require('http').server(app);
//usando socket.io
var io=rquire('socket')(http);

app.use(express.static(__dirname + '/public'));//aqui se seviran archivos estaticos


var port=process.env.PORT || 3000;//esto lo exige heroku

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');//ruta pan index
});

http.listen(port,function(){
	console.long('escuchando en el puerto:' +port);
});