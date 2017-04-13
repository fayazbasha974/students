//custom factory all the api's except login
app.factory('customFactory',function($http,$q){
    var object = {};
    object.post = function(data){
        console.log(object.url);
        var defered = $q.defer();
    $http({
        url : object.url,
        method : 'POST',
        data : data
    }).then(function(success){
        defered.resolve(success);
    },
        function(error){
            defered.reject(error);
        }
    )
    return defered.promise;
    }
    return object;
})
// factory for login api only
.factory('login',function($http,$q){
    var object = {};
    object.login = function(data){
        var defered = $q.defer();
    $http({
        url : '/login',
        method : 'POST',
        data : data
    }).then(function(success){
        defered.resolve(success);
        // console.log(success);
    },
        function(error){
            // console.log(error);
            defered.reject(error);
        }
    )
    return defered.promise;
    }
    return object;
});