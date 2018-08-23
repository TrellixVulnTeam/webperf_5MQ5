angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider


		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'	
        })
        .when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'	
        })
        .when('/result', {
			templateUrl: 'views/result.html',
			controller: 'ResultController'	
		})

		.when('/signin', {
			templateUrl: 'views/signin.html',
			controller: 'HomeController'
		});

	$locationProvider.html5Mode(true);

}]);