var module = angular.module('nodeApp');

module.controller('aboutPageCtrl', function($scope, $http) {
    angular.extend($scope, {
        searchText: '',
        data: [{name: 'Name1'}, {name: 'Name2'}, {name: 'Name3'}, {name: 'Name4'}, {name: 'Name5'},{name: 'Name6'}, {name: 'Name7'}, {name: 'Name8'}, {name: 'Name9'}, {name: 'Name10'}, {name: 'Name11'}],
        selectedItems: []
    });
    
    
    $scope.fetch = function(){
        return $http.get('/data/names');
    };
});
