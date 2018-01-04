// public/js/services/UsersService.js
angular.module('UsersService', []).factory('UsersService', ['$http','$window', function($http, $window) {
    function makeConfig(url, method, params={}, headers={}) {
      var config = {"url": url, "method": method};
      if (!angular.equals(params, {}))
        config.params = params;
      if (!angular.equals(headers, {}))
        config.headers = headers;
      return config;
    }
    return {
        // call to get all Users
        get : function() {
            return $http.get('/api/users', makeConfig('/api/users','GET'));
        },

        // call to POST and create a new User
        create : function(username) {
            return $http.post('/api/users', makeConfig('/api/users','POST',{'username':username}));
        },

        // local storage save
        login : function(id) {
          $window.localStorage.setItem("sessionId", id);
          return id;
        },

        getSessionId : function () {
          return $window.localStorage.getItem("sessionId");
        },

        checkUsername : function (username) {
          return $http.get('/api/user/' + username, makeConfig('/api/users','GET'));
        },

        checkSession : function (id) {
          return $http.get('/api/users/' + id, makeConfig('/api/users','GET'));
        },

        logout : function () {
          $window.localStorage.removeItem("sessionId");
          return true;
        }
        /* TODO: call to DELETE a user
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }*/
    }

}]);
