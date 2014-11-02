var townBookApp = angular.module('townBookApp', [
	'ngRoute',
	'townBookControllers',
	'townBookFilters',
  'townBookDirectives',
  'google-maps'
]);


townBookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/massachusetts', {
          templateUrl: 'partials/insights.html',
          controller: 'InsightsCtrl',
          requireLogin: false
      }).
      when('/', {
        templateUrl: 'partials/town-list.html',
        controller: 'TownListCtrl',
        requireLogin: true
      }).
      when('/towns/:townSlug', {
        templateUrl: 'partials/town-detail.html',
        controller: 'TownDetailCtrl'          
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);