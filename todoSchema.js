var mongoose = require('mongoose');

db = mongoose.connect('mongodb://localhost/react-todo');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
	id: Number,
	name: String,
	isComplete: Boolean
})

var todo = mongoose.model('todo', todoSchema);

module.exports = todo;
