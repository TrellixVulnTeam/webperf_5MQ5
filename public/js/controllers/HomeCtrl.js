angular.module('HomeCtrl', []).controller('HomeController', function($scope,$http) {

    $scope.tagline = 'If your website takes longer than 2 seconds to load you are losing customers.';	
    $scope.getMetrics = async function(data){
        console.log(data.name);
        const result = await $http.get('/api/metrics?URL='+data.name);
        console.log(result);
        $scope.data = result.data;
        $scope.$apply();
   }

});
