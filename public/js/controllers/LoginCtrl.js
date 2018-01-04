// public/js/controllers/LoginCtrl.js
angular.module('LoginCtrl', []).controller('LoginController',['$scope', '$window', 'UsersService', function($scope, $window, UsersService) {
    var ctrl = this;
    ctrl.scope = $scope;
    ctrl.scope.tagline = 'Login';
    var sessionId = $window.localStorage.getItem("sessionId");
    //if localstorage has an id, check server and redirect
    if (sessionId) {
      // if sessionId local storage item is not null, redirect to bookings
      UsersService.checkSession(sessionId).then(function (res) {
        // if id is valid on database, check local storage value
        if (res.data[0] && (res.data[0]._id === $window.localStorage.getItem("sessionId"))) {
          //if there is a sessionId, redirect to /bookings
          $window.location.href = "/bookings";
        } else {
          //if not, database entry changed meanwhile, logout user
          UsersService.logout();
        }
       });
    }

    ctrl.login = function() {
      //Try getting user
      // if username exists, redirect to bookings
      UsersService.checkUsername(ctrl.username).then(function (res) {
        // if username is valid on database, updatee local storage value
        if (res.data[0] && (res.data[0].username === ctrl.username)) {
          //log user in
          UsersService.login(res.data[0].username);
          //if there is a sessionId, redirect to /bookings
          $window.location.href = "/bookings";
        } else {
          ctrl.scope.error = "User does not exist";
        }
       });

      UsersService.get(ctrl.username).then(function (res) {
        //check if data exists
        ctrl.scope.user = res.data[0];
        //If ctrl.scope user exists in db
        if (ctrl.scope.user.length) {
          //Save the _id in local storage
          UsersService.login(ctrl.scope.user._id);
          $window.location.href = "/bookings";
        } else {
          ctrl.scope.error = "Username does not exist";
        }
       },function (error){
            console.log('Error: ' + error);
            ctrl.scope.error = "Username does not exist";
       });
    }
}]);
