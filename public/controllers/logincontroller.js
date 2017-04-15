app.controller('loginCtrl', function($scope, $location, customFactory, $localStorage){
  console.log("login controller");
  $scope.loginuser = function(data){
  		customFactory.url = '/login';
      customFactory.post(data).then(function(success){
      console.log(success);
      // $location.path('/adminpanel');
    },
      function(error){
        console.log(error);
      }
    )
  }
});
