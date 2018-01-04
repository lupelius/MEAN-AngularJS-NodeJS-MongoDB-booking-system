// public/js/services/BookingsService.js
angular.module('BookingsService', []).factory('BookingsService', ['$http', function($http) {
    function makeConfig(url, method, params={}, headers={}) {
      var config = {"url": url, "method": method};
      if (!angular.equals(params, {}))
        config.params = params;
      if (!angular.equals(headers, {}))
        config.headers = headers;
      return config;
    }
    return {
        // call to get all Bookingss
        get : function() {
            return $http.get('/api/bookings', makeConfig('/api/bookings','GET'));
        },

        // call to PUT and create a new booking on user with the _id
        create : function(_id,bookingsData) {
            return $http.post('/api/bookings', makeConfig('/api/bookings','POST',{'_id': _id,'bookings': parseInt(bookingsData,10)}));
        },

        /* TODO: call to DELETE a booking
        delete : function(id) {
            return $http.delete('/api/bookings/' + id);
        }*/
    }

}]);
