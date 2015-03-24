var module = angular.module('nodeApp');

module.controller('aboutPageCtrl', function($scope, $http) {
    angular.extend($scope, {
        searchText: '',
        data: [{name: 'Name1'}, {name: 'Name2'}, {name: 'Name3'}, {name: 'Name4'}, {name: 'Name5'},{name: 'Name6'}, {name: 'Name7'}, {name: 'Name8'}, {name: 'Name9'}, {name: 'Name10'}, {name: 'Name11'}],
        selectedItems: []
    });
    
     $scope.tags = [
                    { text: 'just' },
                    { text: 'some' },
                    { text: 'cool' },
                    { text: 'tags' }
                ];
    $scope.categories = [{label : 'name', displayName: 'Name', isFilterable: true},
			 {label : 'id', displayName: 'Id', isFilterable: true},
			 {label : 'address', displayName: 'Address', isFilterable: true},
			 {label : 'age', displayName: 'Age', isFilterable: true}];
			 	 	
    $scope.userInfo = [ {name: 'Kanhai', id: 1, address: 'Kalol', age: 24},
			{name: 'Sandip', id: 2, address: 'Vavol', age: 25},
			{name: 'Hardik', id: 3, address: 'Junagarh', age: 25},
			{name: 'Mahesh', id: 4, address: 'Rajkot', age: 25},
			{name: 'Devendra', id: 5, address: 'Bhavnagar', age: 29}];
    $scope.fetch = function(){
        return $http.get('/data/names');
    };
    $scope.selectedFilters = [];
});
