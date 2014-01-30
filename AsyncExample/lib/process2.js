var async = require("async");

var q = async.queue(function(task, callback){

    console.log("hello " + task.name);
    callback(null);

}, 3);

q.push({name:"kyfxbl"}, function(err){
    console.log("done");
});

q.push({name:"liting"}, function(err){
    console.log("finish");
})


var order = [];

async.nextTick(function(){
    order.push(222);
});

order.push(111);

process.nextTick(function(){
    console.log(order);// [111, 222]
});


async.times(5, function(n, next){

    console.log("n: " + n);
    next(null, n * 2);

}, function(err, results){

    console.log(results);// [0, 2, 4, 6, 8]
});