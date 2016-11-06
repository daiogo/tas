var smartfare = angular.module('SmartFare', ['ng', 'ngRoute']);

smartfare.controller('tripsTableController', function($scope, $http) {
    $http.get('/api/trips').success(function(data) {
        $scope.trips = data;
        console.log(data);
    });
});

smartfare.controller('usersTableController', function($scope, $http) {
    $http.get('/api/users').success(function(data) {
        $scope.users = data;
        console.log(data);
    });
});

smartfare.controller('vehiclesTableController', function($scope, $http) {
    $http.get('/api/vehicles').success(function(data) {
        $scope.vehicles = data;
        console.log(data);
    });
});

/*
smartfare.controller('nameController', function($scope) {});

<div ng-controller="nameController">
	<label>Nome: </label>
	<input type="text" ng-model="myName">
	<h4>Olá {{myName}}</h4>
</div>
*/
