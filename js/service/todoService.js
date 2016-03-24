var _ = require('underscore');
window.jQuery = window.$ =  require("jquery");

var promise = require("es6-promise");
var resourceUrl = '/api/todo';

module.exports = {
	addTodo: function (todo, cb) {
        // var Promise = promise.Promise;
        // return new Promise(function (resolve, reject) {
        //     $.ajax({
        //         url: resourceUrl,
        //         data: JSON.stringify(todo),
        //         method: "POST",
        //         dataType: "json",
        //         contentType: "application/json",
        //         success: resolve,
        //         error: reject
        //     });
        // });

        //$.post(resourceUrl, todo, function() {
        //    cb();
        //});
        $.ajax({
            type: "POST",
            url: resourceUrl,
            data: todo,
            success: cb
        });
    },

    getTodos: function () {        
        // var Promise = promise.Promise;
        // return new Promise(function (resolve, reject) {
        //     $.ajax({
        //         url: resourceUrl,
        //         method: "GET",
        //         dataType: "json",
        //         success: resolve,
        //         error: reject
        //     });
        // });

        return $.ajax({
            url: resourceUrl,
            method: "GET"
        });
        
    }

}