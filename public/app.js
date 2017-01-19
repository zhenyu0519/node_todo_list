//angular application
var todoApp = angular.module('todoApp',[]);
//The $http service requests a page on the server
todoApp.controller('myCtrl', function($scope, $http){
	$scope.formData = {};
	//when lanuch on the pages, get all the todos and list them all
	$http.get('/api/todos').success(function(todos){
		$scope.todos = todos;
	}).error(function(todos){
		console.log('Error: ' + todos);
	});
	//when submitting the add form, send text to the node API
	$scope.createTodo = function(){
		$http.post('api/todos', $scope.formData).success(function(todos){
			//clear the form so our user is ready to write other todo
			$scope.formData = {};
			$scope.todos = todos;
			// console.log(todos);
		}).error(function(todos){
			console.log('Error: ' + todos);
		});
	};



	//delete the todo after checking it
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