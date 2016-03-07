var TodoDispatcher = require('../dispatcher/TodoDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

	all : function(content) {
		TodoDispatcher.dispatch({
			type: TodoConstants.all,
			content: content
		})
	},

	create: function(content) {
		TodoDispatcher.dispatch({
			type: TodoConstants.create,
			content: content
		})
	},

	update: function(content) {
		TodoDispatcher.dispatch({
			type: TodoConstants.update,
			content: content	
		})
	},

	remove: function(content) {
		TodoDispatcher.dispatch({
			type: TodoConstants.remove,
			content: content	
		})
	}

};

module.exports = TodoActions;
