// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController',['$scope', '$window', 'UsersService', function($scope, $window, UsersService) {
    var ctrl = this;
    ctrl.scope = $scope;
    ctrl.scope.tagline = 'SignUp';
    var sessionId = $window.localStorage.getItem("sessionId");
    //if localstorage has an id, check server and redirect
    if (sessionId && $window.location.href.indexOf("bookings") === -1) {
      // check session on backend
      UsersService.checkSession(sessionId).then(function (res) {
        //if the sessionId is also valid, redirect to /bookings
        if (res.data[0] && res.data[0]._id === $window.localStorage.getItem("sessionId")) {
          $window.location.href = "/bookings";
        } else {
          //if not, database entry changed meanwhile, logout user
          UsersService.logout();
        }
       },function (error){
            console.log('Error: ' + error);
            ctrl.scope.error = "Problem retrieving username";
       });
    }

    ctrl.signup = function() {
        //Signup by calling create and Save the returned _id in local storage
        UsersService.create(ctrl.username).then(function(res) {
          //Log the user in, and redirect
          UsersService.login(res.data._id);
          $window.location.href = "/bookings";
        }, function(error) {
          console.log('Error: ' + error);
          ctrl.scope.error = "Problem retrieving username";
        });
    };
}]);
