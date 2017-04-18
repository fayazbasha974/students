app.controller('applicationCtrl', function($scope, $location, $http , $q, $timeout){
  console.log("application controller");
  $scope.enterValidation = function(){
      console.log("enter");
      return true;
  };

  $scope.exitValidation = function(){
      console.log("exit")
      return true;
  };
  //example using context object
  $scope.exitValidation = function(context){
      console.log("enter validation");
      return context.firstName === "Jacob";
  }
  //example using promises
  $scope.exitValidation = function(){
      var d = $q.defer()
      $timeout(function(){
          return d.resolve(true);
      }, 2000);
      return d.promise;
  }
});