'use strict';

//Incident reports service used to communicate Incident reports REST endpoints
angular.module('incident-reports').factory('IncidentReports', ['$resource',
	function($resource) {
		return $resource('incident-reports/:incidentReportId', { incidentReportId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);