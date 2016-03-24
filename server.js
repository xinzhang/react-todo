var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//app.use(express.favicon());
app.use('/lib', express.static(__dirname + '/lib'));

app.get('/', express.static(__dirname));

app.listen(4200, function() {
	console.log('start listening port 4200');
})

