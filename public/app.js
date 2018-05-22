var app = angular.module("myApp", ["ngRoute"]);
app.controller('myCtrl', function ($scope, customFactory) {
  $scope.students = $scope.student = {
    studentDetails: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: ''
    },
    familyDetails: [{
      name: '',
      relationship: ''
    }]
  };
  $scope.getStudents = function () {
    customFactory.url = '/getStudents';
    customFactory.get().then(function (success) {
      console.log(success);
      $scope.students = success.data;
    },
      function (error) {
        console.log(error);
      }
    )
  }
  $scope.getStudents();
  $scope.addStudent = function () {
    console.log($scope.student);
    customFactory.url = '/createStudent';
    customFactory.post($scope.student).then(function (success) {
      console.log(success);
      // $scope.students = success.data;
      $scope.getStudents();
    },
      function (error) {
        console.log(error);
      }
    )
  }
});