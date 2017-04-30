var app = angular.module('School-App', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {

      controller: 'loginCtr',
      templateUrl: 'views/login.html',
      controllerAs: 'vm'
    })
    .when('/dashboard', {
      resolve: {
        "check": function($location, $rootScope) {
          if (!$rootScope.loggedIn) {
            $location.path('/');
          }
        }

      },

      templateUrl: 'views/dashboard.html',
      controller: 'loginCtr',
      controllerAs: 'vm'

    })
    .when('/register', {
      controller: 'loginCtr',
      templateUrl: 'views/register.html',
      controllerAs: 'vm'

    })
    .otherwise({
      redirectTo: '/'
    });

});




// Set Control
app.controller('loginCtr', ['$http', '$scope', '$location', '$rootScope', '$cookies', function($http, $scope, $location, $rootScope, $cookies) {
  var vm = this;
  this.currentUser;

  // Control for login
  this.submit = function() {
    $rootScope.loggedIn = false;
    console.log("Loginhere...");
    $http({
      method: 'POST',
      url: "/login",
      data: this
    }).then(function(response) {
      console.log("login success", response);
      console.log(typeof response.data);

      if (typeof response.data === 'object') {
        $scope.error_msg = null;
        $rootScope.loggedIn = true;
        $rootScope.currentUser = response.data;
        $location.path('/dashboard');
      } else {
        $scope.error_msg = response.data;
        $rootScope.loggedIn = false;
      }
    }, function(error) {
      $rootScope.loggedIn = false;
      console.log("login failure", response);
    });
  }


  // create user ... from register form
  this.register = function() {
    console.log("Register.. submit");
    console.log(this);

    $http({
      method: 'POST',
      url: "/login/register",
      data: this
    }).then(function(response) {
      console.log("Register success", response);
      if (typeof response.data === 'object') {
        $scope.error_msg = null;
        $rootScope.loggedIn = true;
        $location.path('/dashboard');
      } else {
        $scope.error_msg = response.data;
      }


    }, function(error) {
      console.log("Register failure", response);
    });
  };

  this.logout = function() {
    console.log("logout");
    $rootScope.loggedIn = false;
  };

}]);

// Set Control
app.controller('UserController', ['$http', '$scope', '$location', '$rootScope', function($http, $scope, $location, $rootScope) {


}]);
