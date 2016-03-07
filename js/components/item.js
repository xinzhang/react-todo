var React = require('react');
var TodoActions = require('../actions/TodoActions');

var Item = React.createClass({
	toggle: function() {
		this.props.todo.isComplete = !this.props.todo.isComplete;		
		TodoActions.update(this.props.todo);		
	},

	render: function() {
		return <li className="list-group-item pointer" onClick={this.toggle}>{this.props.todo.name}</li>
	}
})

module.exports = Item;