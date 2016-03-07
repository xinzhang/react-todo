
var _ = require("underscore");
var React = require('react');
var Item = require('./item');

var Items = React.createClass({
    renderItems: function() {
        //return _.map(this.props.todos, function(todo) {
        //    return <Item todo={todo} />;
        //});
        return _.map(this.props.todos, function(todo){
            return <Item todo={todo} />;
        });
    },
    
    render: function() {
        return (
            <ul className="list-group">
                {this.renderItems()}
            </ul>
        )
    } 
});

module.exports = Items;
