app.controller('userprofilecontroller', function($scope,$localStorage,$http){
	console.log("user profile");
	$scope.findFriend = $localStorage.user.findFriend;
	console.log($scope.findFriend);
      $scope.sendRequest = function(){
            $http({
                  url : 'userprofile/friend/'+$scope.findFriend._id,
                  method : 'POST',
                  data : {
                        sender : $localStorage.user.username
                  }
            }).then(function(success){
                  console.log(success);
            },
                  function(error){
                        console.log(error);
                  }
            )
      }
	$scope.logOut = function(){
      console.log("logOut");
      $http({
       url: '/logOut',
       method:'POST'
      }).then(function(success){
       console.log(success);
       $location.path('/');
      },function(error){
       console.log(error);
      })
    }
});