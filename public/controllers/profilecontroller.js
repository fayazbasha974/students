app.controller('profileCtrl', function($scope, $location,getusers,$http,$localStorage, $q){
  console.log("profile controller");
  $scope.selected = undefined;
  $scope.loggedinuser = $localStorage.user.username;
  getusers.getusers().then(function(success){
  	$scope.users = success.data.data;
  	console.log($scope.users);
  },
  	function(error){
  		console.log(error);
  	}
  )
  $scope.acceptRequest = function(data){
    console.log(data);
     $http({
        url : '/userprofile/accept_request/'+data,
        method : 'POST',
        data : {
          username : $localStorage.user.username
        }
      }).then(function(success){
        console.log(success);
        swal("added to friends list");
      },
        function(error){
          console.log(error);
        }
    )
  }
  $scope.friendRequests = function(){
    $http({
      url : '/userprofile/'+'123',
      method : 'POST',
      data : {
        username : $localStorage.user.username
      }
    }).then(function(success){
      console.log(success);
      $scope.friendrequests = success.data.friends_acceptance.accept;
      $scope.friends = success.data.friends_acceptance.friends;
    },
      function(error){
        console.log(error);
      }
    )
  }
  $scope.friendRequests();
  $scope.findFriend = function(user){
  	console.log(user);
  	$http({
  		url : '/search/'+user,
  		method : 'POST',
      data : {
        username : $localStorage.user.username
      }
  	}).then(function(success){
      console.log(success);
      if(success.data.data[0]._id){
        /*console.log("hai "+success.data.data[0].firstName);*/
        if(success.data.friend_status == 1){
          swal("friend request already sent");
        }
        else if(success.data.friend_status == 2){
          swal("already friends");
        }
        else{
          $localStorage.user.findFriend = success.data.data[0];
          $location.path('userprofile');
        }
      }
  	},
  		function(error){
  			console.log(error);
  		}
  	)
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
  	/*getusers.getuser(user).then(function(success){
  		console.log(success);
  	},
  		function(error){
  			console.log(error);
  		}
  	)*/
  }
});