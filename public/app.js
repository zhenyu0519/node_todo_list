//create angular application
var todoApp = angular.module('todoApp',[]);
//create the controller
todoApp.controller('myCtrl', function($scope, $http){
	//when lanuch the page, the text area should display the bind text as default
	$scope.initForm = {};
	//when lanuch on the pages, get all the todos and list them all
	$http.get('/api/todos').success(function(todos){
		$scope.todos = todos;
	}).error(function(todos){
		console.log('Error: ' + todos);
	});
	//when submitting the add form, send text to the node API
	$scope.createTodo = function(){
		$http.post('api/todos', $scope.initForm).success(function(todos){
			//clear the form to default text as our user is ready to write other todo
			$scope.initForm = {};
			$scope.todos = todos;
			console.log(todos);
		}).error(function(todos){
			console.log('Error: ' + todos);
		});
	};



	//delete the todo with event id
	$scope.deleteTodo = function(id){
		console.log("the id is: " + id);
		$http.delete('/api/todos/' + id).success(function(todos){
			$scope.todos = todos;
			// console.log(todos);
		}).error(function(todos){
			console.log('Error: ' + todos);
		});
	};

});