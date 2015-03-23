'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:autocomplete
 * @description
 * # autocomplete
 */
const RIGHT_ARROW_KEY_CODE = 39;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
var firstElement = '';
var lastSelectedElement = '';
angular.module('nodeApp')
    .directive('autocomplete', function($compile, $document) {
        return {
            require: 'ngModel',
            template: '<div></div>',
            restrict: 'A',
            scope: {
                ngModel: '=',
                data: '=',
                fetch: '&',
                selectedItems: '='
	        		
            },
            link: function(scope, element, attrs, ctrl) {
                scope.test = 'test';
                scope.applyClass = "selected-item";
                var elem = '<ul class="autocomplete-dropdown"  ng-show="isListPopulated">' +
                    '<li class="autocomplete-item" ng-repeat="option in subNameArray" ng-class="{\'selected-name\': option.selected}" ng-click="selectItem(option, $event)">{{option.name}}</li>' +
                    '</ul>';
                var elem1 = '<div class="search-box-container">'+	
                '<ul class="selected-fields" as-sortable="sortableOptions" ng-model="selectedItems">'+
                '<li class="selected-field-item" ng-repeat="option in selectedItems" as-sortable-item  option><div as-sortable-item-handle>{{option.name}}<span class="remove-name" ng-click="removeItem(option, $event)">&times;</span></div></li>'+
        	'</ul>'+
		'</div>';
                var filteredList = [];
                scope.isListPopulated = false;
                if (angular.isDefined(scope.data)) {
                    scope.options = scope.data;
                } else {
                    scope.fetch().then(function(data) {
                        scope.options = data.data;
                        scope.subNameArray = _.pluck(scope.options, 'name');
                    });
                }


                angular.element('.search-box-parent').append($compile(elem)(scope));
                angular.element('.search-box').prepend($compile(elem1)(scope));
                element.bind('click', function() {
                    scope.isListPopulated = true;
                    scope.$apply();
                });


                scope.$watch('ngModel', function() {
                    filteredList = [];
                    if (!scope.ngModel.length) {
                        angular.element('.sub-text-box').text('');
                        scope.subNameArray = scope.options;
                    } else {
                        scope.subNameArray = _.groupBy(scope.options, function(name) {
                            return _.startsWith(name.name, scope.ngModel);
                        }).true;
                        if (angular.isUndefined(scope.subNameArray)) {
                            angular.element('.sub-text-box').text('');
                        } else if(angular.isDefined(scope.findFirstAvailableName())){
				angular.element('.sub-text-box').text(scope.subNameArray[scope.findFirstAvailableName()].name);
			} else{
				angular.element('.sub-text-box').text('');
			    }			
                    }
                    firstElement = '';
                    lastSelectedElement = '';
                });

		scope.findFirstAvailableName = function() {
		    return _.findIndex(scope.subNameArray, function(name){
			  return angular.isUndefined(name.selected);
		     });
		};

                scope.selectItem = function(option, event) {
                    scope.selectedItem = option;
                    angular.element('.main-text-box').text('');
                    angular.element('.sub-text-box').text('');
                    option.selected = true;
                    scope.selectedItems.push(option);
                };

		scope.removeItem = function(option, event) {
		    var index = scope.subNameArray.indexOf(option);
		    delete scope.subNameArray[index].selected;
		    scope.selectedItems.splice(scope.selectedItems.indexOf(option), 1);	
		};

		scope.sortableOptions = {
              		accept: function () {
                	   return true;
                	}
                };

                $document.bind('click', function(event) {
                    if (!angular.element('.search-box').find(event.target).size() && !angular.element('.autocomplete-dropdown').find(event.target).size()) {
                        scope.isListPopulated = false;
                        scope.$apply();
                    }
                });

                element.bind('keydown', function(event) {
                    if (event.keyCode === RIGHT_ARROW_KEY_CODE && scope.ngModel.length) {
                        element.text(scope.subNameArray[0].name);
                        element.focus();
                        scope.$apply();
                    } else if (event.keyCode === DOWN_ARROW_KEY_CODE) {
                        var isHoverElementPresent = angular.element('.hovered-list-item');
                        if (lastSelectedElement[0] === angular.element('.autocomplete-dropdown .autocomplete-item')[angular.element('.autocomplete-dropdown .autocomplete-item').length - 1]) {
                            firstElement = angular.element('.autocomplete-dropdown .autocomplete-item')[0];
                            angular.element(lastSelectedElement).addClass('hovered-list-item');
                            return;
                        }
                        if (!isHoverElementPresent.length) {
                            firstElement = angular.element('.autocomplete-dropdown .autocomplete-item')[0];
                            angular.element(firstElement).addClass('hovered-list-item');
                        } else {
                            if (!lastSelectedElement) {
                                angular.element(firstElement).removeClass('hovered-list-item');
                                lastSelectedElement = angular.element(firstElement).next();
                            } else {
                                angular.element(lastSelectedElement).removeClass('hovered-list-item');
                                lastSelectedElement = angular.element(lastSelectedElement).next();
                            }
                            angular.element(lastSelectedElement).addClass('hovered-list-item');
                            if (!lastSelectedElement) {
                                angular.element('.autocomplete-dropdown')[0].scrollTop = 0;
                            } else if (angular.element('.autocomplete-dropdown')[0].clientHeight <= angular.element(lastSelectedElement)[0].offsetTop) {
                                angular.element('.autocomplete-dropdown')[0].scrollTop += angular.element(lastSelectedElement)[0].clientHeight;
                            }
                        }
                    } else if (event.keyCode === UP_ARROW_KEY_CODE) {
                        if (lastSelectedElement[0] === angular.element('.autocomplete-dropdown .autocomplete-item')[0]) {
                            angular.element(lastSelectedElement).addClass('hovered-list-item');
                            firstElement = angular.element('.autocomplete-dropdown .autocomplete-item')[0];
                            return;
                        }
                        if (angular.element('.autocomplete-dropdown')[0].scrollTop !== 0) {
                            angular.element('.autocomplete-dropdown')[0].scrollTop -= angular.element(lastSelectedElement)[0].clientHeight;
                        }
                        angular.element(lastSelectedElement).removeClass('hovered-list-item');
                        lastSelectedElement = angular.element(lastSelectedElement).prev();
                        angular.element(lastSelectedElement).addClass('hovered-list-item');
                    }
                });


            }

        };
    });
