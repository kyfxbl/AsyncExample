var async = require("async");

async.each(["abc", "def", "ghi"], function(item, callback){

    console.log(item);
    callback(null);// must call once

}, function(err){

    if(err){
        console.error("error");
    }
});

async.eachLimit(["123", "456", "789"], 2, function(item, callback){

    console.log(item);
    callback();

}, function(error){

    if(error){
        console.error("error: " + error);
    }

});

async.map([1,3,5], function(item, callback){

    var transformed = item + 1;
    callback(null, transformed);

}, function(err, results){

    if(err){
        console.error("error: " + err);
        return;
    }

    console.log(results);// [2, 4, 6]

});

async.filter([1, 5, 3, 7, 2], function(item, callback){

    callback(item > 3);

}, function(results){

    console.log(results);// [5, 7]

});

async.reject([4, 7, 88, 11, 36], function(item, callback){

    callback(item > 11);

}, function(results){

    console.log(results);// [4, 7, 11]

});

async.reduce([3, 2, 1], 0, function(memo, item, callback){

    callback(null, memo + item)

}, function(err, result){

    if(err){
        console.error("error: " + err);
        return;
    }

    console.log(result);// 6
});

async.reduceRight(["!", "ld", "wor"], "hello ", function(memo, item, callback){

    callback(null, memo + item)

}, function(err, result){

    if(err){
        console.error("error: " + err);
        return;
    }

    console.log(result);// hello world!
});

async.detect([13, 44, 23], function(item, callback){

    callback(item > 37);

}, function(result){

    console.log(result);// 44

});

var person1 = {"name": "aaa", age:79};
var person2 = {"name": "bbb", age:23};
var person3 = {"name": "ccc", age:54};

async.sortBy([person1, person2, person3], function(person, callback){

    callback(null, person.age);

}, function(err, sorted){

    console.log(sorted);
});

async.some([1, 5, 9], function(item, callback){

    callback(item > 10);

}, function(result){

    console.log(result);// false

});

async.every([1, 21, 23], function(item, callback){

    callback(item > 10);

}, function(result){

    console.log(result);// false

});

async.concat([1, 2, 3], function(item, callback){

    callback(null, [item+1, item+2]);

}, function(err, results){

    console.log(results);// [2, 3, 3, 4, 4, 5];

});