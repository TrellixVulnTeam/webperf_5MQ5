angular.module('ResultCtrl', []).controller('ResultController', function($scope,$http,$location) {

   async function init(){
        const url = $location.search().URL;
        let result; 
        try{
            document.getElementById('loader').style.display = 'block';
            result = await $http.get('/api/metrics?URL='+ url);
        }
        finally{
            document.getElementById('loader').style.display = 'none';
            $scope.data = result.data;
            $scope.$apply();
        }
   }

   init();

});
