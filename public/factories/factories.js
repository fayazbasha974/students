app.factory('signup',function($http,$q){
    var object = {};
    object.signup = function(data){
        var defered = $q.defer();
    $http({
        url : '/register',
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
})
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
})
.factory('getusers',function($http,$q){
    var object = {};
    object.getusers = function(data){
        var defered = $q.defer();
    $http({
        url : '/search',
        method : 'GET'
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
