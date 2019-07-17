var http = require('http');
var mysql = require('mysql');
var express =  require('express');
var app = express();

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      name:req.query.name,
      record:req.query.record,
      height:req.query.height,
      weight:req.query.weight,
      age:req.query.age,
      gender:req.query.gender
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
