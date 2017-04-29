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
      templateUrl: 'views/dashboard.html'

    })
    .when('/register', {
      controller: 'loginCtr',
      templateUrl: 'views/register.html',
      controllerAs: 'vm'

    })
    .otherwise({
      redirectTo: '/'
    });

  // ---------------
  run.$inject = ['$rootScope', '$location', '$cookies', '$http'];

  function run($rootScope, $location, $cookies, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path('/login');
      }
    });
  }
  // -------------


});




// Set Control
app.controller('loginCtr', ['$http', '$scope', '$location', '$rootScope', function($http, $scope, $location, $rootScope) {

  // Control for login
  this.submit = function() {

    console.log(this);
    $http({
      method: 'POST',
      url: "/login",
      data: this
    }).then(function(response) {
      console.log("login success", response);
      console.log(response.data);
      if (response.data !== "Wrong password") {
        $rootScope.loggedIn = true;
        $location.path('/dashboard');

      }


    }, function(error) {
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
      $location.path('/dashboard');

    }, function(error) {
      console.log("Register failure", response);
    });
  }


  //
  //
  // $rootScope.username = $scope.username; // $rootScope
  // $rootScope.password = $scope.password;
  //
  // console.log($scope.username + "  " + $scope.password);
  //
  // if ($scope.username === "admin" && $scope.password === "admin") {
  //   $rootScope.loggedIn = true;
  //   $location.path('/dashboard');
  //
  // } else {
  //   alert("wrong password");
  // }

  // };



}]);

// Set Control
app.controller('UserController', ['$http', '$scope', '$location', '$rootScope', function($http, $scope, $location, $rootScope) {


}]);
