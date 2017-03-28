app.controller("resultController", function($scope, $http, $state, sharedProperties){
    
    $scope.selectedDates = sharedProperties.getDates();
    console.log($scope.selectedDates.checkedInDate);
    console.log($scope.selectedDates.checkedOutDate);
    
	 /* to get the json data*/
    console.log("before call");
	
    $http.get("http://localhost:3000/data/date-image.json")
    .then(function mySucces(response) {
        
        $scope.dateImageData = response.data;
        console.log($scope.dateImageData);
        console.log($scope.dateImageData.dateImage[0]);
		$scope.getDateRange();
		
    }, function myError(response) {
        $scope.dateImageErrorStatus = response.statusText;
        console.log($scope.dateImageErrorStatus);
    });
    
    console.log("after call");
	
	$scope.dateRangeArray = [];
	
	$scope.getDateRange = function(){
		
		console.log($scope.dateImageData.dateImage.length)
		for(var i=0; i<$scope.dateImageData.dateImage.length; i++){
			if($scope.selectedDates.checkedInDate == $scope.dateImageData.dateImage[i].date){
				$scope.dateRangeArray.push($scope.dateImageData.dateImage[i]);
			}
			if($scope.selectedDates.checkedOutDate == $scope.dateImageData.dateImage[i].date){
				$scope.dateRangeArray.push($scope.dateImageData.dateImage[i]);
			}
			if((moment($scope.selectedDates.checkedInDate).isBefore($scope.dateImageData.dateImage[i].date)) &&
			(moment($scope.selectedDates.checkedOutDate).isAfter($scope.dateImageData.dateImage[i].date)))	{
                $scope.dateRangeArray.push($scope.dateImageData.dateImage[i]);
            }
		}
		console.log($scope.dateRangeArray);
		
	};
});


