
var Todo = require('./todoSchema.js');

var todo1 = new Todo({
	id: '1',
	name: 'go to everest',
	isCompleted: true
})

todo1.save(function (err) {
	if (err) throw err;
	console.log('todo1 saved.');
});

