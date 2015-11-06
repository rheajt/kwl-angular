var app = angular.module('kwlApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/components/index/indexView.html',
      controller: 'IndexCtrl'
    })
    .when('/kwl', {
      templateUrl: 'app/components/kwl/kwlView.html',
      controller: 'KwlCtrl'
    })
    .when('/newchart', {
      templateUrl: 'app/components/newchart/newchartView.html',
      controller: 'NewchartCtrl'
    });
}]);

app.controller('IndexCtrl', ['$scope', function($scope) {

  $scope.data = 'welcome';

}]);

app.controller('KwlCtrl', ['$scope', function($scope) {

  $scope.data = ['this', 'is', 'a', 'test'];
  $scope.current = 0;
  $scope.kwl = {"know": [], "want": [], "learn": []};

  $scope.add = function(key, data) {
    $scope.kwl[key].push(data);
    $scope.current++;
  }

}]);

app.controller('NewchartCtrl', ['$scope', function($scope) {

  $scope.createChart = function() {
    /************************
    TODO: create a service that will store the chart information and forward the
    user back to the index page where all the charts are displayed. search bar to
    filter at the top of the page
    *****************************/

  }

}])