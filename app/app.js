var app = angular.module('kwlApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/index/indexView.html',
      controller: 'indexCtrl'
    });
}]);

app.controller('indexCtrl', ['$scope', function($scope) {

  $scope.data = 'welcome';

}]);