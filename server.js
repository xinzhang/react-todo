var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var Todo = require('./todoSchema.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//app.use(favicon(__dirname + '/lib/favicon.ico'));
app.use('/', express.static(__dirname));
app.use('/lib', express.static(__dirname + '/lib'));

app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post('/todo', function(req, resp){
	
	var todo1 = new Todo(req.body);

	todo1.save(function (err) {
		if (err) throw err;
		console.log('todo1 saved.');
	});

	console.log('completed in serverside');
});

app.listen(4200, function() {
	console.log('start listening port 4200');
})

