app.controller('homeCtrl', function($scope, $location,signup){
  console.log("home controller");
  $scope.mobilepattern = /^[0-9]{10}$/;
  $scope.user = {};
  $scope.$watch('user', function(){
    if($scope.user.pwd != $scope.user.cpwd){
      $scope.passwordmismatch = true;
    }
    else{
      $scope.passwordmismatch = false;
    }
  }, true);
  $scope.signupuser = function(user){
    signup.signup(user).then(function(success){
      console.log(success.data);
      if(success.data.message == "Usermail already exists try with another"){
        console.log("username already exists");
      }
      else{
        $location.path("login");
      }
    },
      function(error){
        console.log(error);
      }
    )
  }
});
