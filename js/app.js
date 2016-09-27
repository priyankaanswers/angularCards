(function(){

	var myapp = angular.module('animateApp', ['ngAnimate']);

	var left_cards = [
		{title : "Card 1", lor : true},
		{title : "Card 2", lor : true},
		{title : "Card 3", lor : true}
	];

	var right_cards = [
		{title : "Card 4", lor : false}
	];

	myapp.controller('AnimateController', function($scope) {

		$scope.left_items = left_cards;
		$scope.right_items = right_cards;

		$scope.animate = function(title){
			var index = searchIndex(title,this.left_items);
			this.left_items.splice(index,1);
			this.right_items.push({title : title, lor : false });
		}

	});

	myapp.directive("cardSection",function(){
		return {
			scope: true,
			replace : true,
			templateUrl : "cards.html",
			controller : "AnimateController",
			controllerAs : "anime"
		};
	});

	myapp.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
	});

	function searchIndex(key,arr){
		for(var i=0; i < arr.length; i++){
			if(arr[i].title === key){
				return i;
			}
		}
	}

})();

