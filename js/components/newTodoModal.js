var React = require("react");
var ReactDOM = require("react-dom");

var TodoActions = require('../actions/TodoActions');
var TodoStore = require('../stores/TodoStore');

var NewTodoModal = React.createClass({
	getInitialState: function() {
		return {
			visible: false,
			value: ""
		}
	},

 	componentDidMount: function () {
        this.$el = ReactDOM.findDOMNode(this);        
        //this.$el.on("hidden.bs.modal", this.reset);
        
        TodoStore.addChangeListener(function() {
            //this.$el.modal("hide");
        }.bind(this));
    },

	show: function () {
		console.log(this.$el);
        this.$el.modal("show");
    },

 	reset: function() {
        this.setState({ value: "" });
    },

	onChange: function(e) {
		this.setState({value:e.target.value})
	},

	save: function() {
		console.log('onclick and set task ' + this.state.value);
		TodoActions.create({
			"name": this.state.value,
			isComplete:false
		});
	},

	render: function() {
		return  <div id="newTaskModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
				    <div className="modal-dialog modal-sm">
				        <div className="modal-content">
				            <div className="modal-header">
				                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				                	<span aria-hidden="true">&times;</span>
				                	<span className="sr-only">Close</span>
				               	</button>
				                <h4 className="modal-title">New Task</h4>
				            </div>
				            <div className="modal-body">
				            	<input placeholder="Task name..." type="text" value={this.state.value} onChange={this.onChange} />                
				            </div>
				            
				            <div className="modal-footer">
				                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.save}>Save</button>
				                <button type="button" className="btn btn-default" data-dismiss="modal" >Close</button>
				            </div>
				        </div>
				    </div>
				</div>
	},

})

module.exports = NewTodoModal;
