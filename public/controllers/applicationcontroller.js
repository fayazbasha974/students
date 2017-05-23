app.controller('applicationCtrl', function($scope, $location, $http, customFactory){
  console.log("edit profile controller");
  $scope.data = {};
  $(document).ready(function () {
    $('#dateOfBirth').datepicker();
    $('#inputpassportvalid').datepicker();
    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
  });
  $scope.$watch('data', function(){
    if($scope.data.title == 'mr'){
        $scope.data.gender = 'male';
    }
    else if($scope.data.title == 'mrs'){
        $scope.data.gender = 'female';
    }
    else{
         $scope.data.gender = '';
    }
  }, true);
  $scope.applicationSubmit = function(data){
    console.log(data);
    customFactory.url = 'http://localhost:3000/submitApplication';
    customFactory.post(data).then(function(success){
        console.log(success);
        swal("application submitted succesfully");
    },
        function(error){
            console.log(error);
        }
    )
  }
});