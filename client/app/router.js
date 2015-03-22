var nodeApp = angular.module('nodeApp');

nodeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'app/src/views/home.html',
        controller: 'homePageCtrl'
      }).
      when('/about', {
        templateUrl: 'app/src/views/about.html',
        controller: 'aboutPageCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
  
 