var React = require('react');
var TodoActions = require('../actions/TodoActions');

var Item = React.createClass({
	getInitialState: function() {
		return {
			hoverEdit: false
		}
	},

	toggle: function() {
		console.log('item toggle');
		this.props.todo.isComplete = !this.props.todo.isComplete;		
		TodoActions.update(this.props.todo);		
	},

	hoverIn: function() {
		this.setState({
			hoverEdit: true
		})	
	},

	hoverOut: function() {
		this.setState({
			hoverEdit: false
		})
	},

	remove: function() {
		console.log('item remove');
		TodoActions.remove(this.props.todo);
		return false;
	},

	render: function() {
		return (
			<li className="list-group-item pointer" onClick={this.toggle} onMouseOver={this.hoverIn} onMouseLeave={this.hoverOut}>
			{this.props.todo.name}
			{ 
				this.state.hoverEdit ? (<a onClick={this.remove}><span className="glyphicon glyphicon-remove"></span></a>) : null 
			}			
			</li>
			);
	}
});

module.exports = Item;