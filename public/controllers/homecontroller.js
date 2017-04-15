app.controller('homeCtrl', function($scope, $location,customFactory){
  $scope.signupuser = function(user){
    console.log(user);
    customFactory.url = '/register';
    customFactory.post(user).then(function(success){
      console.log(success);
      /*if(success.data.code == 1){
        swal (" registered succesfully ");
      }*/
      $location.path('/login');
    },
      function(error){
        console.log(error);
      }
    )
  }
});
