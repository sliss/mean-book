var townBookApp = angular.module('townBookApp', [
	'ngRoute',
	'townBookControllers',
	'townBookFilters',
  'townBookDirectives'

]);


townBookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
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