app.controller('editprofileCtrl', function($scope, $location, $http){
  console.log("edit profile controller");
  $scope.updateProfile = function(user){
  	$http({
  		url : '/dashboard/updateProfile',
  		method : 'POST',
  		data : user
  	}).then(function(success){
  		console.log(success);
  	},
  		function(error){
  			console.log(error);
  		}
  	)
  }
});