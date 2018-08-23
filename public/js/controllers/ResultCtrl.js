angular.module('ResultCtrl', []).controller('ResultController', function($scope,$http,$location,$route) {

   $scope.auditData;

   async function init(){
        let url = $location.search().URL;
        let result;
        let resultAudit;
        try{
            document.getElementById('loader').style.display = 'block';
            document.getElementById('result').style.display = 'none';
            result = await $http.get('https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url='+ url + "&screenshot=true&key=AIzaSyBhz65TytGa_HDj5f-Gplsswvc06_CKybI");
            let text = document.createTextNode("Now running audit...");
            document.getElementById('loader-text').style.display = 'none';
            document.getElementById('loader-audit').appendChild(text);
            resultAudit = await $http.get('/api/metrics?URL='+ url);
        }
        finally{
            document.getElementById('loader').style.display = 'none';
            document.getElementById('result').style.display = 'block';
            $scope.data = "Page speed score : " + result.data.ruleGroups.SPEED.score + "%";
            $scope.auditData = resultAudit.data;
            //convert screenshot binary to image & fix api issue
            let image = result.data.screenshot.data;
            image = image.replace(/_/g,"/");
            image = image.replace(/-/g,"+");
            $scope.imageSource = image;
            $scope.$apply();
        }
   }

   init();

   //run audit test by click button
   $scope.runAudit = async function(){
       let url = $location.search().URL;
       try{
            document.getElementById('loader-audit').style.display = 'block';
            result = await $http.get('/api/metrics?URL='+ url);
        }
        finally{
            document.getElementById('loader-audit').style.display = 'none';
            $scope.auditData = result.data;
        }
   }

});
