app.controller('loginCtrl', function($scope, customFactory, $location) {
  $scope.loginuser = function(user) {
    console.log(user)
    customFactory.url = '/login';
    customFactory.post(user).then(function(success) {
      console.log(success + 'success details');
      console.log(success.data);
      if(success.data.code == 1) {
        swal('Logged in Successfully');
        $location.path('/');
      } else {
        swal('Invalid Credentials');
      }
    });
  }
});