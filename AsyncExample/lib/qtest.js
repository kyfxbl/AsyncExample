var async = require("async");
var q = require("q");
var request = require("request");

function getResource(path) {

    var deferred = q.defer();

    request({
        method: 'GET',
        uri: path
    }, function (error, response, body) {
        if (error) {
            deferred.reject({
                code: -1,
                message: "调用失败"
            });
            return;
        }
        if (response.statusCode == 200) {
            deferred.resolve(body);
            return;
        }
        deferred.reject({
            code: -1,
            message: body
        });

    });

    return deferred.promise;
}

function step1(callback){
    getResource("http://www.baidu.com").then(function(result){
        callback(null, "111");
    }, function(err){
        callback(result);
    });
}

function step2(callback){
    callback(null, "222");
}

async.series([step1, step2], function(err, results){

    console.log(results);// ["111", "222"]

});



