var weatherAppControllers = angular.module('weatherAppControllers', []);

weatherAppControllers.controller('WeatherStationsCtrl', ['$scope', '$resource', '$rootScope'
  , function ($scope, $resource, $rootScope) {
		var Stations = $resource('http://127.0.0.1:3600/stations');
		$scope.stations = Stations.query();	
	    $scope.orderProp = 'Name';
	    if ($rootScope.page === undefined) {
	    	$rootScope.page = 'grid';
	    }
}]);

weatherAppControllers.controller('WeatherGridCtrl', ['$scope', '$resource', '$routeParams', '$rootScope'
, function ($scope, $resource, $routeParams, $rootScope) {
		$rootScope.page = 'grid';
		$scope.id = $routeParams.station;
		$scope.chart = {
					    labels : [],
					    datasets : [
					        {
					            fillColor : "rgba(151,187,205,0)",
					            strokeColor : "#e67e22",
					            pointColor : "rgba(151,187,205,0)",
					            pointStrokeColor : "#e67e22",
					            data : []
					        }
					    ]
					};
		var Temps = $resource('http://127.0.0.1:3600/temps?station=' + $scope.id);
		$scope.temps = Temps.query(function (response) {	
			for (var i = 0; i < $scope.temps.length; i++) {
		    	//	$scope.chart.labels[i] = $scope.temps[i].date;
		    		$scope.chart.datasets[0].data[i] = $scope.temps[i].temp;
	    		}
		});
}]);

weatherAppControllers.controller('WeatherChartCtrl', ['$scope', '$resource', '$routeParams', '$rootScope'
, function ($scope, $resource, $routeParams, $rootScope) {
		$rootScope.page = 'chart';
		$scope.id = $routeParams.station;

    		$scope.chartSeries = [{"name": $routeParams.station, "data": [[]]}];

		var Temps = $resource('http://127.0.0.1:3600/temps?station=' + $scope.id);
		$scope.temps = Temps.query(function (response) {	
			for (var i = 0; i < $scope.temps.length; i++) {
				var el = [$scope.temps[i].date,$scope.temps[i].temp];
		    		$scope.chartSeries[0].data[i] = el;
	    		}
		});

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'line'
            },
            plotOptions: {
                series: {
                    stacking: ''
                }
            }
        },
        series: $scope.chartSeries,
	xAxis: {
	    type: 'category',
	    title: {
        		text: 'Date'
    	    }
	},
        title: {
            text: 'Temperatures'
        },
        credits: {
            enabled: true
        },
        loading: false
    };

}]);

