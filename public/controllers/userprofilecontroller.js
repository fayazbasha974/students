app.controller('userprofilecontroller', function($scope,$localStorage,$http, customFactory,$location){
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
      $scope.viewUserData = function(data){
           // console.log(data);
            $localStorage.currentApplication = data;
          //  console.log( $rootScope.currentApplication);
             $location.path('/userdetails');
      }
});