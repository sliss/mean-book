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
      when('/insights', {
          templateUrl: 'partials/insights.html',
          controller: 'InsightsCtrl'
      }).
      when('/', {
        templateUrl: 'partials/town-list.html',
        controller: 'TownListCtrl'
      }).
      when('/towns/:townSlug', {
        templateUrl: 'partials/town-detail.html',
        controller: 'TownDetailCtrl'          
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);