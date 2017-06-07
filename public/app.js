var app = angular.module("myApp", ["ngRoute","ui.bootstrap","ngStorage"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/home.html",
        controller : "homeCtrl"
    })
    .when("/login", {
        templateUrl : "views/login.html",
        controller : "loginCtrl"
    })
    .when("/application", {
        templateUrl : "views/application.html",
        controller : "applicationCtrl"
    })
    .when("/profile", {
        templateUrl : "views/profile.html",
        controller : "profileCtrl"
    })
    .when("/userprofile", {
        templateUrl : "views/userprofile.html",
        controller : "userprofilecontroller"
    })
    .when("/userdetails",{
        templateUrl : "views/userdata.html",
        controller : "userdatacontroller"
    })
}).directive('textOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^a-z A-Z]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
}).directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
}).controller('myCtrl', function($scope){
  console.log("main controller");
});