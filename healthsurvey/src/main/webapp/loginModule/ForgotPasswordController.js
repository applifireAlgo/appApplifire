'use strict';
 angular.module('LoginPage',['ngCookies']).controller('ForgotPasswordController',
    ['$scope','$location','$http', '$cookies',
    function ($scope,$location,$http,$cookies) {
 
    	debugger;
    	//For close action of the form a tag href is set to initial path
    	var pathName=location.pathname;
		var initialPath=pathName.slice(0,pathName.lastIndexOf("/"));
    	$scope.loginPath=location.origin+initialPath+"/";
    	
    	//Get data from LoginController and dynamically load the select box
    	var sharedData=$cookies.getAll();
    	$cookies.remove('loginId');
    	$cookies.remove('securityData');
    	
    	$scope.data = {
        		securityQuesId:null,
        	    availableOptions:JSON.parse(sharedData.securityData),
        };   
    	
    	//On submit click
        $scope.onSubmitClick = function () {
        	debugger;
        	//Check whether fields are valid or not
        	if($scope.data.securityQuesId!=null && $scope.securityAns!=undefined){
	        	//Prepare jsonData
	        	 var jsonData={
	             		"loginId" :sharedData.loginId,
	 					"passRecoveryId" : $scope.data.securityQuesId,
	 					"answer" : $scope.securityAns
	 			 }
	        	 $scope.loading = true;
	        	 $http({
	                 url: 'secure/PasswordGenerator/forgetPassword',
	                 method: "POST",
	                 data : jsonData,
	                 headers : {isBeforeSession : true},
	               }).success(function (data, status, headers, config) {
	             	  	debugger;
	             	  	$scope.loading = false;
	             	  	if(data.response.success==true){
	             	  		//show successful email msg sent or not
	             	  		alert(data.response.message);
	             	  		
	             	  		//redirect to loginpage.html
	             	  		var pathName=location.pathname;
	    					var initialPath=pathName.slice(0,pathName.lastIndexOf("/"));
	    					location.href=location.origin+initialPath+"/";
	             	  	}
	             	  	else{
	             	  		$scope.error=data.response.message;
	             	  	}
	             	  	
	                 }).error(function (data, status, headers, config) {
	                 	debugger;
	                 	$scope.loading = false;
	                 	//Show error msg in div tag
	                 	if(status!=200){
	                 		$scope.error='Cannot connect to server';
	                 	}
	             });
         }else{
        	 $scope.error='Fields cannot be left empty';
         }
        };
}]);
