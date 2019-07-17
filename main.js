var http = require('http');
var mysql = require('mysql');
var express =  require('express');
var app = express();
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'marathon'
});

connection.connect();

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/post.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "post.htm" );
})

app.get('/get.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "get.htm" );
})

app.post('/process_post', urlencodedParser,function (req, res) {
   // Prepare output in JSON format
   response = {
      name:req.body.name,
      record:req.body.record,
      height:req.body.height,
      weight:req.body.weight,
      age:req.body.age,
      gender:req.body.gender
   };
   console.log(response);
   res.end(JSON.stringify(response));

	var user =[ [req.body.name, req.body.record, req.body.height, req.body.weight, req.body.age, req.body.gender] ];



	connection.query('INSERT INTO user(name, record, height, weight, age, gender) VALUES ?', [user], function(err, result, fields){
		if(err) throw err; 
		console.log(result);
	});
})

app.get('/process_get', urlencodedParser,function (req, res) {
   // Prepare output in JSON format
   	var user =[ [req.query.name] ];
	console.log(req.query.name);

connection.query('SELECT * FROM user WHERE name=?', [user], function(err, result, fields){
		if(err) throw err; 
		console.log(result);
		res.end(JSON.stringify(result));
	});
})


var server = app.listen(8081,'10.246.172.231', function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

