var app = angular.module('kwlApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/components/index/indexView.html',
      controller: 'IndexCtrl'
    })
    .when('/kwl/:id', {
      templateUrl: 'app/components/kwl/kwlView.html',
      controller: 'KwlCtrl'
    })
    .when('/newchart', {
      templateUrl: 'app/components/newchart/newchartView.html',
      controller: 'NewchartCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);

app.service('fireSrv', ['$location', function($location) {
  var kwlCharts = {
    "charts": [
      {
        "id": 1,
        "title": "THis is a test",
        "chart": ['this', 'is', 'a', 'test']
      },
      {
        "id": 2,
        "title": "ANother test",
        "chart": ['i', 'am', 'trying', 'out', 'angular', 'services']
      }
    ]
  };

  return {
    getAll: function() {
      return kwlCharts.charts;
    },
    getChart: function(id) {
      return kwlCharts.charts.filter(function(each) {return each.id == id})[0].chart;
    }
  };
}]);

app.controller('IndexCtrl', ['$scope', 'fireSrv', function($scope, fireSrv) {

  $scope.data = fireSrv.getAll();

}]);

app.controller('KwlCtrl', ['$scope', '$routeParams', 'fireSrv',
  function($scope, $routeParams, fireSrv) {

    $scope.data = fireSrv.getChart($routeParams.id);
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