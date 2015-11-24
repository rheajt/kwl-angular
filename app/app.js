var app = angular.module('kwlApp', ['ngRoute', 'firebase']);

app.constant('FBURL', 'https://kwlcharts.firebaseio.com/');

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
    .when('/new', {
      templateUrl: 'app/components/newchart/newchartView.html',
      controller: 'NewchartCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);

app.factory('Auth', ['FBURL', '$firebaseAuth', function(FBURL, $firebaseAuth) {
  var ref = new Firebase(FBURL);
  var auth = $firebaseAuth(ref);
  var authData = {};

  auth.$onAuth(function(data) {
    if(data) {
      authData = data;
    }
  });

  return {
    auth: auth,
    authData: authData
  }
}]);

app.service('Charts', ['FBURL', '$firebaseArray', '$firebaseObject', function(FBURL, $firebaseArray, $firebaseObject) {
  var ref = new Firebase(FBURL + '/charts');

  this.ref = ref;

  this.getCharts = function() {
    return $firebaseArray(ref);
  }

  this.getChartById = function(id) {
    return $firebaseObject(ref.child(id).child('concepts'));
  }

  this.setChart = function(chart) {
    $firebaseArray(ref).$add(chart);
  }

}]);

app.controller('IndexCtrl', ['$scope', 'Auth', 'Charts', function($scope, Auth, Charts) {

  $scope.charts = Charts.getCharts();

}]);

app.controller('KwlCtrl', ['$scope', '$routeParams', 'Charts',
  function($scope, $routeParams, Charts) {

    $scope.chart = Charts.getChartById($routeParams.id);
    $scope.current = 0;

    Charts.ref.child($routeParams.id).child('concepts').once('value', function(snapshot) {
      $scope.chartLength = snapshot.numChildren();
    });

    var kwl = {"know": [], "want": [], "learn": []};
    $scope.showKwl = {"know": "", "want": "", "learn": ""};

    $scope.add = function(key, data) {
      if($scope.current < $scope.chartLength) {
        kwl[key].push(data);
        $scope.showKwl[key] = kwl[key].join(', ');
        $scope.current++;
      }
    }

    $scope.save = function() {
      $scope.saved = 'not really saved anywhere!';
    }

}]);

app.controller('NewchartCtrl', ['$scope', 'Charts', function($scope, Charts) {
  $scope.chart = {};
  $scope.chart.concepts = [];

  $scope.addConcept = function() {
    $scope.chart.concepts.push($scope.concept);
    $scope.concept = '';
  }

  $scope.createChart = function() {
    Charts.setChart($scope.chart);
  }

}])