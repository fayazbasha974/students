var app = angular.module("myApp", ["ngRoute"]);
app.controller('myCtrl', function ($scope, customFactory, $http) {
  $scope.students = $scope.student = $scope.editStudent =$scope.viewStudent = {
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
  $scope.deleteStudents = function(data){
    $scope.idToDelete = data;
    console.log($scope.idToDelete);
  }
  $scope.confirmDelete = function(){
    customFactory.url = '/deleteStudent';
    customFactory.post($scope.idToDelete).then(function (success) {
      console.log(success);
      // $scope.students = success.data;
      $scope.getStudents();
    },
      function (error) {
        console.log(error);
      }
    )
  }
  $scope.viewStudents = function (data) {
    console.log(data);
    $scope.viewStudent = data;
  }
  $scope.editStudents = function (data) {
    console.log(data);
    $scope.editStudent = data;
  }
  $scope.studentEdit = function () {
    console.log($scope.editStudent);
    // $http({
    //   url: '/updateStudent',
    //   method: 'POST',
    //   data: $scope.editStudent
    // }).then(function (success) {
    //   console.log(success);
    // },
    //   function(error){
    //     console.log(error);
    //   }
    // )
    customFactory.url = '/updateStudent';
    customFactory.post($scope.editStudent).then(function (success) {
      console.log(success);
      // $scope.students = success.data;
      $scope.getStudents();
    },
      function (error) {
        console.log(error);
      }
    )
  }
  $scope.addFamilyMember = function (value) {
    if (value == 'add') {
      $scope.student.familyDetails.push({
        name: '',
        relationship: ''
      });
    }
    else if (value == 'edit') {
      $scope.editStudent.familyDetails.push({
        name: '',
        relationship: ''
      });
    }
  }
});