var q = require("q");

var deferred = q.defer();

var promise = deferred.promise;

promise.then(function(result){
    console.log("success: " + result.message);
}, function(err){
    console.log("error: " + err.message);
});

setTimeout(function(){
    deferred.resolve({message:"hello world"});
}, 1000);