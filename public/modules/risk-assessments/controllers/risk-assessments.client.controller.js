'use strict';

// Risk assessments controller
angular.module('risk-assessments').controller('RiskAssessmentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'RiskAssessments',
	function($scope, $stateParams, $location, Authentication, RiskAssessments) {
		$scope.authentication = Authentication;

		// Create new Risk assessment
		$scope.create = function() {
			// Create new Risk assessment object
			var riskAssessment = new RiskAssessments ({
				name: this.name
			});

			// Redirect after save
			riskAssessment.$save(function(response) {
				$location.path('risk-assessments/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Risk assessment
		$scope.remove = function(riskAssessment) {
			if ( riskAssessment ) { 
				riskAssessment.$remove();

				for (var i in $scope.riskAssessments) {
					if ($scope.riskAssessments [i] === riskAssessment) {
						$scope.riskAssessments.splice(i, 1);
					}
				}
			} else {
				$scope.riskAssessment.$remove(function() {
					$location.path('risk-assessments');
				});
			}
		};

		// Update existing Risk assessment
		$scope.update = function() {
			var riskAssessment = $scope.riskAssessment;

			riskAssessment.$update(function() {
				$location.path('risk-assessments/' + riskAssessment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Risk assessments
		$scope.find = function() {
			$scope.riskAssessments = RiskAssessments.query();
		};

		// Find existing Risk assessment
		$scope.findOne = function() {
			$scope.riskAssessment = RiskAssessments.get({ 
				riskAssessmentId: $stateParams.riskAssessmentId
			});
		};
	}
]);