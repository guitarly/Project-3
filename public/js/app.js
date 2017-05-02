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
//Added a meals config
    }).when('/meals', {
      controller: 'loginCtr',
      templateUrl: 'views/addMeals.html',
      controllerAs: 'vm'
    }).when('/meals/:id',{
      controller: 'loginCtr',
      templateUrl: 'views/editMeal.html',
      controllerAs: 'vm'
    }).when('/childs', {
      controller: 'loginCtr',
      templateUrl: 'views/addChild.html',
      controllerAs: 'vm'
    }).when('/childs/:id',{
      controller: 'loginCtr',
      templateUrl: 'views/editChild.html',
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
  };


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

  //added a meals
  this.addMeal = function(){
    $http({
      method:'POST',
      url: '/meals/display',
      data: {
        menu: this.menu,
        cost: this.cost,
        date: this.date
      },
    }).then(function(){
        $location.path('/meals/display');
    });
  };
  this.addChild = function(){
    $http({
      method:'POST',
      url: '/childs',
      data: {
        firstname: this.firstname,
        lastname: this.lastname,
        school: this.school,
        grade: this.grade
      },
    }).then(function(){
        $location.path('/childs/display');
    });
  };

this.getMeal = function(){

  $http({
      method: 'GET',
      url: '/meals/'
    }).then(function(response){
      console.log(response);
      vm.meals = response.data;
    });
};
this.getMeal();

this.getChild = function(){

  $http({
      method: 'GET',
      url: '/childs/'
    }).then(function(response){
      console.log(response);
      vm.childs = response.data;
    });
};
this.getChild();

this.editMeal = function(id){
    this.editableMeal = id;
};
this.editChild = function(id){
    this.editableChild = id;
};

this.updateMeal = function(meal){
  $http({
  method: 'PUT',
  url: '/meals/' + meal._id,
  data: meal
}).then(function(response){
  vm.editableMeal = null;
  vm.getMeal();
});
};
this.updateChild = function(child){
  $http({
  method: 'PUT',
  url: '/childs/' + child._id,
  data: child
}).then(function(response){
  vm.editableChild = null;
  vm.getChild();
});
};

this.deleteMeal = function(id){
  $http({
       method: 'DELETE',
       url:'/meals/'+id
     }).then(function(response){
     vm.getMeal();
     });
};
this.deleteChild = function(id){
  $http({
       method: 'DELETE',
       url:'/childs/'+id
     }).then(function(response){
     vm.getChild();
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
