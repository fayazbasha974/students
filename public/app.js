var app = angular.module("myApp", ["ngRoute","ui.bootstrap","ngStorage"]);
app.config(function($routeProvider, $locationProvider) {

    $routeProvider
    .when("/", {
        templateUrl : "views/home.html",
        controller : "homeCtrl"
    })
    .when("/login", {
        templateUrl : "views/login.html",
        controller : "loginCtrl"
    })
    .when("/editprofile", {
        templateUrl : "views/editprofile.html",
        controller : "editprofileCtrl"
    })
    // $locationProvider.html5Mode({
    // enabled: true,
    // requireBase: false
    // });
}).controller('myCtrl', function($scope){
//   console.log("main controller");
});