var module = angular.module('nodeApp');

module.controller('aboutPageCtrl', function($scope, $http) {
    angular.extend($scope, {
        searchText: '',
        data: ['Name1', 'Name2']
    });
    
    
    $scope.fetch = function(){
        return $http.get('/data/names');
    };
});