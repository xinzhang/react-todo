var _ = require('underscore');
var React = require('react');
var NewTodoModal = require('./newTodoModal');
var Items = require('./items');
var ts = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');


var Todo = React.createClass({

	getInitialState: function() {
        console.log('get Initial state');

        return {
            todos: ts.getTodos(true)
        }  
    },

    componentDidMount: function() {
        ts.addChangeListener(this._onChange);
    },
    
    componentsWillUnmount: function() {
        ts.removeListener(this._onChange);
    },

	renderList: function(complete) {        
        return <Items todos={_.filter(this.state.todos, function(x) { return x.isComplete === complete; }) } />;
    },

    create: function(){
        console.log('create');
        console.log(this.refs.create);
        this.refs.create.show();
    },

	render : function(){
        console.log(this.state.todos);

		return <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <h2>Todo List</h2>                    
                </div>
                <div className="col-md-6 top25">
                    <a onClick={this._refresh}> <i className="glyphicon glyphicon-refresh"></i> refresh </a>
                </div>
                <div className="col-md-4 top25">
                    <button type="button" className="btn btn-primary pull-right" data-toggle="modal" data-target="#newTaskModal">New Task</button>                        
                </div>
            </div>
                    
            <div className="row">
                <div className="col-md-6">
                    <h3 className="spacing-bottom">Incomplete</h3>
                    {this.renderList(false)}
                </div>
                <div className="col-md-6">
                    <h3 className="spacing-bottom">Complete</h3>
                    {this.renderList(true)}
                </div>
            </div>
            
            <NewTodoModal ref="create" />  
        </div>;
	},

    _refresh: function() {
        this.setState({todos: ts.getTodos(true)});
    },

    _onChange: function(){
        this.setState({todos: ts.getTodos(false)});
        console.log('todo _conchange');
    }
})

module.exports = Todo;
