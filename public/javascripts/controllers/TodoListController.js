function TodoListController($scope, $http) {
  $scope.todos = [];
  $scope.towns = [];

  $scope.newTodo = {
    done : false,
    due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    description : ''
  };
  $scope.data = '';

  $scope.orderProp = 'name';
  $scope.$watch("orderProp", function() {
      console.log("orderprop changed to " + $scope.orderProp);
  });    
/*
  $scope.doneFilter = { done : true };
  $scope.notDoneFilter = { done : false };
*/


  /*************************
  Controls Town List view
  *************************/
  $scope.initTownList = function() {
    console.log('TodoListController setTowns');
    //via JSON file
    $http.get('towns/towns.json').success(function(data) {
      $scope.towns = data;
      console.log('towns:', data);
    });
  
  };
  //************************

  $scope.setTodos = function(todos) {
    $scope.todos = todos;
  };

  $scope.setTowns = function(towns) {
    console.log('TodoListController setTowns');
    //via mongo
    console.log('towns:', towns);
    $scope.towns = towns;
  };

  $scope.update = function(towns) {
    $http.put('/town/' + town._id + '.json', town).success(function(data) {
      if (!data.town) {
        alert(JSON.stringify(data));
      }
    });
  };

  $scope.updateList = function() {
    $http.get('/towns.json').success(function(data) {
      $scope.towns = data.towns;
    });
  };

  setInterval(function() {
    $scope.updateList();
    $scope.$apply();
  }, 30 * 60 * 1000); // update every 30 minutes;

  $scope.updateList();

  $scope.addNewTodo = function() {
    $http.post('/todo.json', $scope.newTodo).success(function(data) {
      if (data.todo) { // if the POST returns a todo in its response body
        $scope.todos.push(data.todo);
        $scope.newTodo.description = '';
      } else {
        alert(JSON.stringify(data));
      }
    });
  };

// load data from JSONs to mongo
  $scope.loadData = function() {
    console.log("controller: loadData");

    town_filenames = ["abington.json","acton.json","adams.json"];

    for(var i = 0; i < town_filenames.length; i++) {

      var url = './towns/' + town_filenames[i];

      $http.get(url).success(function(data) { //load JSON data from file
        console.log("controller gets the data:", data);
        $scope.data = data;

        $http.post('/town.json', data).success(function(data) {
          if (data.town) { // if the POST returns a todo in its response body
            console.log("saved to DB");
          } else {
            console.log("failed to save to DB");
            alert(JSON.stringify(data));
          }
        });
      });
  }
}
}  