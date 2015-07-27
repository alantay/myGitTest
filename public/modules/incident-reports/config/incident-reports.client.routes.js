'use strict';

//Setting up route
angular.module('incident-reports').config(['$stateProvider',
	function($stateProvider) {
		// Incident reports state routing
		$stateProvider.
		state('listIncidentReports', {
			url: '/incident-reports',
			templateUrl: 'modules/incident-reports/views/list-incident-reports.client.view.html'
		}).
		state('createIncidentReport', {
			url: '/incident-reports/create',
			templateUrl: 'modules/incident-reports/views/create-incident-report.client.view.html'
		}).
		state('viewIncidentReport', {
			url: '/incident-reports/:incidentReportId',
			templateUrl: 'modules/incident-reports/views/view-incident-report.client.view.html'
		}).
		state('editIncidentReport', {
			url: '/incident-reports/:incidentReportId/edit',
			templateUrl: 'modules/incident-reports/views/edit-incident-report.client.view.html'
		});
	}
]);