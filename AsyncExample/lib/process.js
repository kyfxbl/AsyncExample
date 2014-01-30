var async = require("async");

async.series([function(callback){

    console.log("first task");
    callback(null, 1);

}, function(callback){

    console.log("second task");
    callback({message:"some error"}, 2);// callback with a error parameter

}, function(callback){

    console.log("third task");// not called
    callback(null, 3);

}],function(error,results){

    if(error){
        console.error("error happend: " + error);
    }
    console.log(results);// [1, 2]
});

async.parallel([function(callback){

    callback(null, 1);

}, function(callback){

    callback({message:"error"}, null);

}, function(callback){

    callback(null, 3);

}], function(error, results){

    if(error){
        console.error(error.message);
    }

    console.log(results);

});

async.parallelLimit([function(callback){

    callback(null, 1);

}, function(callback){

    callback(null, 2);

}, function(callback){

    callback(null, 3);

}], 2, function(error, results){

    if(error){
        console.error(error.message);
    }

    console.log(results);

});

var count = 0;

async.whilst(
    function () { return count < 5; },
    function (callback) {
        console.log("call once");
        count++;
        setTimeout(callback, 1000);
    },
    function (err) {
        if(err){
            console.log("error: " + err);
        }
        console.log("whilst done");
    }
);

var count2 = 0;

async.doWhilst(function(callback){

    console.log("call once again");
    count2 ++;
    setTimeout(callback, 1000);

}, function(){

    return (count2 < 5);

}, function(err){

    if(err){
        console.log("error: " + err);
    }
    console.log("doWhilst done");
    count2 = 0;

});

var count3 = 0;

async.until(function(){

    return (count3 > 5);

}, function(callback){

    count3 ++;
    setTimeout(callback, 1000);

}, function(error){

    console.log("until done");
    count3 = 0;

});

var count4 = 0;

async.doUntil(function(callback){

    count4 ++;
    setTimeout(callback, 1000);

}, function(){

    return (count4 > 5);

}, function(err){

    console.log("doUntil done");

});

var flag = 0;

async.forever(function(callback){

    setTimeout(function(){
        console.log("forever...");
        console.log(flag);
        flag ++;
        if(flag > 5){
            callback({message:"hehe"});
        }else{
            callback();
        }
    }, 1000);

}, function(err){

    // once this callback be called, the "forever" stops
    if(err){
        console.error("there is an error");
    }

});

async.waterfall([function(callback){

    callback(null, "kyfxbl", 29);

}, function(name, age, callback){

    console.log(name);// kyfxbl
    console.log(age);// 29
    callback(null, 10000, 200);

}, function(salary, bonus, callback){

    console.log(salary);// 10000
    console.log(bonus);// 200
    callback(null, [1, 2, 3]);

}], function(err, results){

    console.log(results);// [1, 2, 3]

});

// f(g(h(n)))
async.compose(function(n, callback){
    setTimeout(function(){
        callback(null, n + 1);
    }, 10);
}, function(n, callback){
    setTimeout(function(){
        callback(null, n * 3);
    },10);
})(4, function(err, result){
    console.log("compose result: " + result);// 13
});