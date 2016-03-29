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

app.get('/api/todo', function(req, resp){
	Todo.find(function (err, todoList) {
		if (err) {
			console.log(err);
			resp.end();
		};

		resp.json( todoList );
		resp.end();
	});

})

app.post('/api/todo', function(req, resp){	

	console.log(req.body);

	var todo1 = new Todo(req.body);

	todo1.save(function (err) {
		if (err) {
			console.log(err.message);
			resp.status(500).send(err.message);
		}

		console.log('todo1 saved.');
	});
	
	resp.status(200).end();
});

app.put('/api/todo', function(req, resp){
	var todo1 = new Todo(req.body);
	console.log(todo1);

	Todo.findOne({ 'id': todo1.id }, function (err, doc) {
		if (doc === undefined) {
			resp.status(404).send('can not find the doc.').end();			
		}
		

		doc.isComplete = todo1.isComplete;
		doc.save( function(err){
			if (err) {
				console.log(err.message);
				resp.status(500).send(err.message);
			}
		});

		console.log('doc ' + todo1.id + ' updated');
		resp.status(200).end();
  	});
  	
});

app.delete('/api/todo', function(req, resp){
	var id = new Todo(req.body);
	console.log(id);

	Todo.find({ id:id }).remove().exec();

	// Todo.findOne({ 'id': id }, function (err, doc) {
	// 	if (doc === undefined) {
	// 		resp.status(404).send('can not find the doc.').end();			
	// 	}
		
	// 	doc.remove( function(err){
	// 		if (err) {
	// 			console.log(err.message);
	// 			resp.status(500).send(err.message);
	// 		}
	// 	});

	// 	console.log('doc ' + todo1.id + ' deleted.');
	// 	resp.status(200).end();
 //  	});
  	
});

app.listen(4200, function() {
	console.log('start listening port 4200');
});

