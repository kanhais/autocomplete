angular.module('nodeApp').directive('filterForTable', function(){
	return {
		templateUrl: 'app/src/views/filterDropDown.html',
	        restrict: 'A',
	        scope: {
	        	data: '=',
	        	selectedFilters: '='
	    	},

	    	link: function(scope, element, attrs, ctrl) {
			scope.isListVisible = false;
			scope.toggleDropDown = function(){
				scope.isListVisible = !scope.isListVisible;			
			};
			
			scope.filterOptions = _.filter(scope.data, function(val){
				return (val.isFilterable);
			});
			
			scope.addFilter = function(filter){
				scope.selectedFilters.push(filter);
			};
		
		}
	};
});
