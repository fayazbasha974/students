app.controller('loginCtrl', function($scope, $location, customFactory){
  $scope.loginuser = function(user) {
    customFactory.url = '/login';
    customFactory.post(user).then(function(success) {
      console.log(success);
      if(success.data.code == 1 && !success.data.data.isAdmin) {
        swal('Logged in Successfully');
        $location.path('/application');
      }
      else if(success.data.code == 1 && success.data.data.isAdmin){
        $location.path('/userprofile');
      }
       else if(success.data.code == 0){
        swal('Invalid Credentials');
      } else {
        swal('Invalid Credentials');
      }
    })
  }
});