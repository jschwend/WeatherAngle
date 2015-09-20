var weatherApp = angular.module('weatherApp', ['ngResource', 'ngRoute', 'weatherAppControllers', "highcharts-ng"]);

weatherApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/empty', {
        templateUrl: 'partials/empty.html',
        controller: 'WeatherStationsCtrl'
      }).
      when('/grid/:station', {
        templateUrl: 'partials/grid.html',
        controller: 'WeatherGridCtrl'
      }).
      when('/chart/:station', {
        templateUrl: 'partials/chart.html',
        controller: 'WeatherChartCtrl'
      }).
      otherwise({
        redirectTo: '/empty'
      });
  }]);
