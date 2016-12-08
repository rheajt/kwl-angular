var app = angular.module('firecharts', ['ngRoute', 'firebase']);

app.constant('FBURL', 'https://kwlcharts.firebaseio.com/');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/index.view.html',
      controller: 'IndexCtrl'
    })
    .when('/firechart/:id', {
      templateUrl: 'app/views/kwl.view.html',
      controller: 'KwlCtrl'
    })
    .when('/new', {
      templateUrl: 'app/views/new.views.html',
      controller: 'NewchartCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);

app.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
  return $firebaseAuth();
}])

app.controller('IndexCtrl', ['$scope', 'Auth', function($scope, Auth) {

  $scope.auth = Auth;

  $scope.auth.$onAuthStateChanged(function(user) {
    $scope.user = user;
  });

}]);

app.controller('KwlCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {

}]);

app.controller('NewchartCtrl', ['$scope', function($scope) {

}])
