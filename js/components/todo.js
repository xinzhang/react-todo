var _ = require('underscore');
var React = require('react');
var NewTodoModal = require('./newTodoModal');
var Items = require('./items');
var ts = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');


var Todo = React.createClass({

	getInitialState: function() {                   
        return {
            todos: ts.getTodos()
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
                <div className="col-md-8">
                    <h2>Todo List</h2>
                </div>
                <div className="col-md-4">
                    <button type="button" className="btn btn-primary pull-right spacing-top" data-toggle="modal" data-target="#newTaskModal">New Task</button>    
                    
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

    _onChange: function(){
        this.setState({todos: ts.getTodos()})
    }
})

module.exports = Todo;
