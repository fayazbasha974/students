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
}).controller('myCtrl', function($scope){
  console.log("main controller");
});