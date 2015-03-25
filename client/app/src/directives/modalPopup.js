angular.module('nodeApp').directive('modalPopup', function(){
	return {
		transclude: true,
		templateUrl: 'app/src/views/modal.html',
	        restrict: 'A',
	        link: function(scope, element, attrs, ctrl) {
			scope.isModalVisible = false;			
			scope.openModal = function(){
				angular.element('.modal-parent').animate({left: '2%', top: '2%' , width: '96%', height: '96%', opacity: '1'}, 1000);
			};
			scope.closeModal = function(){
				angular.element('.modal-parent').animate({left: '100%', top: '100%' , width: '96%', height: '96%', opacity: '0'}, 1000);
			};
		}
	};
});
