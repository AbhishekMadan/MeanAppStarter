var angular = angular.module('todoItems',[]);
angular.controller('mainController',function($scope,$http){
    $scope.formatData = {};

    //Get all todo items
    $http({
        method: 'GET',
        url : 'http://localhost:8090/api/todo'
    }).then(function (response) {
        $scope.todos = response.data;
        console.log(response.data);
    }, function (response) {
        console.log(response);
    });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('http://localhost:8090/api/todo', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        console.log('/api/todo/' + id);
        $http.delete('/api/todo/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});
