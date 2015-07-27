'use strict';

// Incident reports controller
angular.module('incident-reports').controller('IncidentReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'IncidentReports',
	function($scope, $stateParams, $location, Authentication, IncidentReports) {
		$scope.authentication = Authentication;

		// Create new Incident report
		$scope.create = function() {
			// Create new Incident report object
			var incidentReport = new IncidentReports ({
				name: this.name
			});

			// Redirect after save
			incidentReport.$save(function(response) {
				$location.path('incident-reports/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Incident report
		$scope.remove = function(incidentReport) {
			if ( incidentReport ) { 
				incidentReport.$remove();

				for (var i in $scope.incidentReports) {
					if ($scope.incidentReports [i] === incidentReport) {
						$scope.incidentReports.splice(i, 1);
					}
				}
			} else {
				$scope.incidentReport.$remove(function() {
					$location.path('incident-reports');
				});
			}
		};

		// Update existing Incident report
		$scope.update = function() {
			var incidentReport = $scope.incidentReport;

			incidentReport.$update(function() {
				$location.path('incident-reports/' + incidentReport._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Incident reports
		$scope.find = function() {
			$scope.incidentReports = IncidentReports.query();
		};

		// Find existing Incident report
		$scope.findOne = function() {
			$scope.incidentReport = IncidentReports.get({ 
				incidentReportId: $stateParams.incidentReportId
			});
		};
	}
]);