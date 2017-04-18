app.controller('homeCtrl', function($scope, $location,customFactory){
  $scope.signupuser = function(user){
    console.log(user);
    customFactory.url = '/register';
    customFactory.post(user).then(function(success){
      console.log(success + 'success details');
      if(success.data.code == 1){
        swal (" registered succesfully ");
      } else if(success.data.code == 0) {
        swal ("Email ID already exists");
      }
    },
      function(error){
        console.log(error);
      }
    )
  }
});
