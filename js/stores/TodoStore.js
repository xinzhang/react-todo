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

TodoStore.getTodos = function(forceUpdate) {
    if (forceUpdate) {
        todoList = [];
        todoService.getTodos().done(function(data){

            _.map(data, function(x){

                todoList.push({
                    "id" : x.id,
                    "name" : x.name,
                    "isComplete": x.isComplete
                })
            });

            initialLoadToDo = true;

            TodoStore.emitChange();
        })
    }
    
    return todoList;
};

TodoStore.update = function(content) {
    console.log("TodoStore update");
    console.log(todoList);
    // var found = _.find(this.todoList, function(x){return x.id == content.id;});
    
    // console.log(content);
    // console.log(this.todoList);

    // for (var name in found)
    //     found[name] = content[name];
    // console.log(this.todoList);

     todoService.updateTodo(content).done(function(data) {
     });

    TodoStore.emitChange();
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
    console.log('todo store remove');
    
    todoService.removeTodo(content)
        .then(function(data) {
            todoList = _.filter(todoList, function(x){return x.id != content.id;});
            TodoStore.emitChange();
        });
}

TodoDispatcher.register(function(action){
    console.log(action.type);

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