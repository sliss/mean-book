var townBookFilters = angular.module('townBookFilters', []);

townBookFilters.filter('searchName', function() {
  return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		angular.forEach(arr, function(town){

			if(town.name.toLowerCase().indexOf(searchString) !== -1){
				result.push(town);
			}

		});

		return result;
  };
});

townBookFilters.filter('searchStorage', function() {
  return function(arr, searchString){

		if(!searchString){
			return arr;
		}
		
		var result = [];

		searchString = searchString.toLowerCase();
		
		
		angular.forEach(arr, function(key){
			var s = localStorage.getItem(key);
			if(s.indexOf(searchString) !== -1){
				result.push(key);
			}
		});
		return result;
	};
});