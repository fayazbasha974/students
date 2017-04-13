app.controller('homeCtrl', function($scope, $location,customFactory){
  $scope.signupuser = function(user){
    console.log(user);
    customFactory.url = '/signup';
    customFactory.post(user).then(function(success){
      console.log(success);
    },
      function(error){
        console.log(error);
      }
    )
  }
});
