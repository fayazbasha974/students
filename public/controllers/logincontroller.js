app.controller('loginCtrl', function($scope, $location, customFactory){
  $scope.loginuser = function(user) {
    customFactory.url = '/login';
    customFactory.post(user).then(function(success) {
      if(success.data.code == 1) {
        swal('Logged in Successfully');
        $location.path('/application');
      } else if(success.data.code == 0){
        swal('Invalid Credentials');
      } else {
        swal('Invalid Credentials');
      }
    })
  }
});