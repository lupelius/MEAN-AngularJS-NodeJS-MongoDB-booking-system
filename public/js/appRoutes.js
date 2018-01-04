// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/signup.html',
            controller: 'MainController'
        })

        // login page that will use the MainController
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        // signup page that will use the MainController
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'MainController'
        })

        // bookings page that will use the BookingsController
        .when('/bookings', {
            templateUrl: 'views/bookings.html',
            controller: 'BookingsController'
        });

    $locationProvider.html5Mode(true);

}]);
