//angular application
var todoApp = angular.module('todoApp',[]);
//The $http service requests a page on the server
todoApp.controller('myCtrl', function($scope, $http){
	$scope.formData = {};
	//when lanuch on the pages, get all the todos and list them all
	$http.get('/api/todos').success(function(data){
		$scope.todos = data;
		console.log(data);
	}).error(function(data){
		console.log('Error: ' + data);
	});
	//when submitting the add form, send text to the node API
	$scope.createTodo = function(){
		$http.post('api/todos', $scope.formData).success(function(data){
			//clear the form so our user is ready to write other todo
			$scope.formData = {};
			$scope.todos = data;
			console.log(data);
		}).error(function(data){
			console.log('Error: ' + data);
		});
	};

	//delete the todo after checking it
	$scope.deleteTodo = function(id){
		$http.detele('/api/todos/' + id).success(function(data){
			$scope.todos = data;
			console.log(data);
		}).error(function(data){
			console.log('Error: ' + data);
		});
	};

});