var _ = require('underscore');
window.jQuery = window.$ =  require("jquery");

var promise = require("es6-promise");
var resourceUrl = '/api/todo';

module.exports = {
	addTodo: function (todo) {
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
        
        var d = $.Deferred();

        $.ajax({
            type: "POST",
            url: resourceUrl,
            data: todo
        }).done( function(data) {
            console.log('resolve completed');
            d.resolve(data);
        }).fail (function (err) {
            d.reject(data);
        })
        
        return d.promise();

         // return $.ajax({
         //     type: "POST",
         //     url: resourceUrl,
         //     data: todo
         // })

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