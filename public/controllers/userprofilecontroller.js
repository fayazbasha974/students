app.controller('userprofilecontroller', function($scope,$localStorage,$http, customFactory){
      console.log("user profile controller");
      customFactory.url = "http://localhost:3000/submitApplication";
      customFactory.get().then(function(success){
            console.log(success);
            $scope.applications = success.data;
      },
            function(error){
                  console.log(error);
            }
      )
});