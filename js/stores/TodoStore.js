var EventEmitter = require('events').EventEmitter;
var TodoDispatcher = require('../dispatcher/TodoDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var _ = require('underscore');

var todoService = require('../service/todoService.js');

var todoListDummyData = [
    {
        "id": 1,
        "name": "Pick up milk",
        "isComplete": false
    },
    {
        "id": 2,
        "name": "Pick up dry cleaning",
        "isComplete": true
    },
    {
        "id": 3,
        "name": "Grocery shopping",
        "isComplete": false
    },
    {
        "id": 4,
        "name": "Hem pants",
        "isComplete": false
    },
    {
        "id": 5,
        "name": "Oil change",
        "isComplete": false
    }    
];

var todoList = [];

var TodoStore = new EventEmitter();

TodoStore.emitChange = function() {
    this.emit('change');
};

TodoStore.addChangeListener = function(listener) {
    this.on('change', listener);
};

TodoStore.getTodos = function() {
    if (todoList.length == 0)
    {
        todoService.getTodos().done(function(data){

            _.map(data, function(x){

                todoList.push({
                    "id" : x.id,
                    "name" : x.name,
                    "isComplete": x.isComplete
                })
            });

            //TodoStore.emitChange();     
            //return todoList;
        })
    }
    
    return todoList;
};

TodoStore.update = function(content) {
    var found = _.find(this.todoList, function(x){return x.id == content.id;});
    for (var name in found)
        found[name] = content[name];

    this.emitChange();
};

TodoStore.create = function(content) {    
    content.id = _.max(todoList,function(x) { return x.id; }).id + 1;

    if (isNaN(content.id))
        content.id = 1;

    todoService.addTodo(content)
        .then(function(data) {
            console.log('todo added. returned to TodoStore');
            todoList.push(content);  
            TodoStore.emitChange();
        });
}

TodoStore.remove = function(content) {
    
    this.emitChange();
}

TodoDispatcher.register(function(action){
    console.log(action.type);
    console.log(TodoConstants.update);

    switch(action.type){
        case TodoConstants.update: {
            console.log('dispatcher triggered');
            TodoStore.update(action.content);
            break;
        }
        case TodoConstants.create: {
            console.log('dispatcher triggered');
            TodoStore.create(action.content);
            break;
        }
        case TodoConstants.remove: {
            console.log('dispatcher remove');
            TodoStore.remove(action.content);
            break;
        }
    }
})

module.exports = TodoStore;