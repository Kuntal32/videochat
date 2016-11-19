// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module
var bodyParser = require('body-parser');
// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(bodyParser.json(),bodyParser.urlencoded({ extended: true }));
httpApp.set('view engine', 'ejs');
httpApp.use(express.static(__dirname + '/app/'));
httpApp.get('/',function(req,res){

	res.render(__dirname + "/app/"+"login" );
	//console.log('f');

});

httpApp.post('/auth',function(req,res){
//console.log(req.body.username);
//req.send(req.body.username);
if(req.body.username=='')
{
	res.redirect(__dirname + "/app/"+"login");
}

res.render(__dirname + "/app/"+"index",{username:req.body.username});
});

//httpApp.use(express.static(__dirname + "/app/"));

// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(8080);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server

var rtc = easyrtc.listen(httpApp, socketServer);
