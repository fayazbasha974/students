//custom factory all the api's except login
app.factory('customFactory',function($http,$q){
    var object = {};
    object.post = function(data){
        // console.log(object.url);
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
    object.get = function(){
        var defered = $q.defer();
        $http({
            url : object.url,
            method : 'GET'
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
.factory('login',function($http,$q,$window){
    var object = {};
    var userInfo;
    object.login = function(data){
        var defered = $q.defer();
    $http({
        url : '/login',
        method : 'POST',
        data : data
    }).then(function(success){
        defered.resolve(success);
        userInfo = {
           accessToken: success.data.token
        };
        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
        // console.log(success);
    },
        function(error){
            // console.log(error);
            defered.reject(error);
        }
    )
    return defered.promise;
    }
    object.getUserInfo = function() {
      return userInfo;
    }
    object.logout = function(){
        var defered = $q.defer();
        $http({
            url :'/logout',
            method : 'POST',
            data : null
        }).then(function(success){
            $window.sessionStorage["userInfo"] = null;
            userInfo = null; 
            defered.resolve(success);
        },
            function(error){
                console.log(error);
                defered.reject(error);
            }
        )
        return defered.promise;
    }
    function init() {
      if ($window.sessionStorage["userInfo"]) {
        userInfo = JSON.parse($window.sessionStorage["userInfo"]);
      }
    }

    init();
    return object;
});