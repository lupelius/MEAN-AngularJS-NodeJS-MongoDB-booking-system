// public/js/controllers/BookingsCtrl.js
angular.module('BookingsCtrl', []).controller('BookingsController', ['$scope', '$window', 'UsersService', 'BookingsService', '$rootScope', '$timeout', function($scope, $window, UsersService, BookingsService, $rootScope, $timeout) {

  //if session does not exist, redirect back to root
  if (!$window.localStorage.getItem("sessionId"))
    $window.location.href = "/";

  var ctrl = this;
  ctrl.scope = $scope;
  ctrl.scope.tagline = 'Bookings';
  //month names
  ctrl.m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  //Setup default times
  ctrl.yesterday = {};
  ctrl.yesterday.date = new Date();
  //make sure minutes hours etc don't scathe the data
  ctrl.yesterday.date = new Date(ctrl.yesterday.date.getFullYear(), ctrl.yesterday.date.getMonth(), ctrl.yesterday.date.getDate(), 0, 0, 0, 0);
  ctrl.today = {};
  //yesterday was set by year month day only, do the same
  ctrl.today.date = new Date( ctrl.yesterday.date );
  ctrl.tomorrow = {};
  //yesterday was set by year month day only, do the same
  ctrl.tomorrow.date = new Date( ctrl.yesterday.date );
  //this variable is needed to reset dates
  ctrl.originDay = new Date( ctrl.yesterday.date );
  //set the days correctly
  ctrl.today.date.setDate(ctrl.today.date.getDate());
  ctrl.yesterday.date.setDate(ctrl.today.date.getDate() - 1);
  ctrl.tomorrow.date.setDate(ctrl.today.date.getDate() + 1);
  ctrl.yesterday.isBooked = "";
  ctrl.today.isBooked = "";
  ctrl.tomorrow.isBooked = "";
  ctrl.users = [];

  function updateUsers() {
    function checkDay(bookings,day) {
      if (Object.values(bookings).indexOf(day.date.getTime()+"") !== -1) {
        return "Booked";
      } else {
        return "";
      }
    }
    UsersService.get().then(function (res) {
      //check if data exists
      if (res.data) {
        ctrl.users = res.data;
        for(var i = 0; i < ctrl.users.length; i++) {
          ctrl.users[i].yesterday = checkDay(ctrl.users[i].bookings,ctrl.yesterday);
          ctrl.users[i].today = checkDay(ctrl.users[i].bookings,ctrl.today);
          ctrl.users[i].tomorrow = checkDay(ctrl.users[i].bookings,ctrl.tomorrow);
        }
      } else {
        ctrl.scope.error = "Problem retrieving users";
      }
     },function (error){
          console.log('Error: ' + error);
          ctrl.scope.error = "Problem retrieving users";
     });
  }
  //make sure users are fresh
  updateUsers();

  //Log the user out
  ctrl.logout = function() {
    UsersService.logout();
    $window.location.href = "/";
  }
  //Go to previous day
  ctrl.prev = function () {
    //Here we substract one day from each value for our 3 days
    ctrl.yesterday.date.setDate(ctrl.yesterday.date.getDate() - 1);
    ctrl.today.date.setDate(ctrl.today.date.getDate() - 1);
    ctrl.tomorrow.date.setDate(ctrl.tomorrow.date.getDate() - 1);
    //update users array to make sure new bookings are reflected
    updateUsers();
  }
  //Go to today day
  ctrl.todayF = function () {
    //Here we reset to originDay to go back to today
    ctrl.yesterday.date.setDate(ctrl.originDay.getDate() - 1);
    ctrl.today.date.setDate(ctrl.originDay.getDate());
    ctrl.tomorrow.date.setDate(ctrl.originDay.getDate() + 1);
    //update users array to make sure new bookings are reflected
    updateUsers();
  }
  //Go to next day
  ctrl.next = function () {
    //Here we add one day to each value for our 3 days
    ctrl.yesterday.date.setDate(ctrl.yesterday.date.getDate() + 1);
    ctrl.today.date.setDate(ctrl.today.date.getDate() + 1);
    ctrl.tomorrow.date.setDate(ctrl.tomorrow.date.getDate() + 1);
    //update users array to make sure new bookings are reflected
    updateUsers();
  }

  ctrl.book = function(id, date) {
    //Book a slot for the given user
    BookingsService.create(id, date);
    //update users array to make sure new bookings are reflected
    updateUsers();
  }

  //Detect inactivity, update every 10 seconds
  var lastDigestRun = new Date();
  var lock = false;
  $rootScope.$watch(function detectIdle() {
    var now = new Date();
    if (now - lastDigestRun > 10*60) {
      if (!lock) {
        $timeout(function () {
          //make sure users are fresh
          updateUsers();
          lock = false;
        }, 10000);
        lock = true;
      }
    }
    lastDigestRun = now;
  });
}]);
