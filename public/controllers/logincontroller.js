app.controller('loginCtrl', function($scope, $location, login, $localStorage){
  console.log("login controller");
  $scope.loginuser = function(data){
  		// console.log(data);
  		login.login(data).then(function(success){
  			// console.log(success);
  			$scope.user = success.data;
        $localStorage.user = {
          username : success.data.username
        }
        console.log($localStorage.user);
        if(success.data.success == "success"){
            swal("logged in successfully");
            $location.path('/profile');
        }
  		},
  			function(error){
  				console.log(error);
          swal("wrong credentials");
  			}
  		)
  }
});