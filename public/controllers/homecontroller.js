app.controller('homeCtrl', function($scope, $location,customFactory){
  $scope.signupuser = function(user){
    console.log(user);
    customFactory.url = '/register';
    customFactory.post(user).then(function(success){
      console.log(success);
      if(success.data.code == 1){
        swal (" registered succesfully ");
        $location.path('login')
      } else if(success.data.code == 0) {
        swal ("email id already exists");
      }
    },
      function(error){
        console.log(error);
      }
    )
  }
});
  (function () {
  'use strict';
  var directiveId = 'ngMatch';
  app.directive(directiveId, ['$parse', function ($parse) {
  
  var directive = {
  link: link,
  restrict: 'A',
  require: '?ngModel'
  };
  return directive;
  
  function link(scope, elem, attrs, ctrl) {
  // if ngModel is not defined, we don't need to do anything
  if (!ctrl) return;
  if (!attrs[directiveId]) return;
  
  var firstPassword = $parse(attrs[directiveId]);
  
  var validator = function (value) {
  var temp = firstPassword(scope),
  v = value === temp;
  ctrl.$setValidity('match', v);
  return value;
  }
  
  ctrl.$parsers.unshift(validator);
  ctrl.$formatters.push(validator);
  attrs.$observe(directiveId, function () {
  validator(ctrl.$viewValue);
  });
  
  }
  }]);
  })();