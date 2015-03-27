/**
 * handles the behaviour of flipping card.
 */
angular.module('angular-flippy', [])
	.directive('flippy', function() {
		return {
			restrict: 'EA',
			scope: {
			     flip: '='	
			},
			link: function($scope, $elem, $attrs) {
				$scope.flipped = false;
				var options = {
					flipDuration: ($attrs.flipDuration) ? $attrs.flipDuration : 400,
					timingFunction: 'ease-in-out',
				};

				// setting flip options
				angular.forEach(['flippy-front', 'flippy-back'], function(name) {
					var el = $elem.find(name);
					if (el.length == 1) {
						angular.forEach(['', '-ms-', '-webkit-'], function(prefix) {
							angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration/1000 + 's ' + options.timingFunction);
						});
					}
				});

				/**
				 * behaviour for flipping effect.
				 */
				$scope.flip = function() {
					angular.element($elem[0]).find('flippy-back').css('background', '');
					if(!$scope.flipped){
						angular.element($elem[0]).find('.card-details').animate({display :'none'}, 100);
						angular.element($elem[0]).find('.div-1').animate({top: '0%', left: '0%', opacity: 1, backgroundColor: '#99e0ff'}, 1000);
						angular.element($elem[0]).find('.div-2').animate({top: '0%', left: '60%', opacity: 1, backgroundColor: '#99e0ff'}, 1000);
						angular.element($elem[0]).find('.div-3').animate({top: '60%', left: '60%', opacity: 1, backgroundColor: '#99e0ff'}, 1000);
						angular.element($elem[0]).find('.div-4').animate({top: '60%', left: '0%', opacity: 1, backgroundColor: '#99e0ff'}, 1000);
						angular.element('flippy-back').animate({backgroundColor: ''}, 1000);	
					}else{	
						angular.element($elem[0]).find('.card-details').animate({display :'block'}, 100);
						angular.element($elem[0]).find('.div-1').animate({top: '30%', left: '30%', opacity: 0, backgroundColor: '#fff'}, 1000);
						angular.element($elem[0]).find('.div-2').animate({top: '30%', left: '30%', opacity: 0, backgroundColor: '#fff'}, 1000);
						angular.element($elem[0]).find('.div-3').animate({top: '30%', left: '30%', opacity: 0, backgroundColor: '#fff'}, 1000);
						angular.element($elem[0]).find('.div-4').animate({top: '30%', left: '30%', opacity: 0, backgroundColor: '#fff'}, 1000);
					}
					$elem.toggleClass('flipped');
					$scope.flipped = !$scope.flipped;
				}

			}
		};
	});
