'use strict';

//Setting up route
angular.module('risk-assessments').config(['$stateProvider',
	function($stateProvider) {
		// Risk assessments state routing
		$stateProvider.
		state('listRiskAssessments', {
			url: '/risk-assessments',
			templateUrl: 'modules/risk-assessments/views/list-risk-assessments.client.view.html'
		}).
		state('createRiskAssessment', {
			url: '/risk-assessments/create',
			templateUrl: 'modules/risk-assessments/views/create-risk-assessment.client.view.html'
		}).
		state('viewRiskAssessment', {
			url: '/risk-assessments/:riskAssessmentId',
			templateUrl: 'modules/risk-assessments/views/view-risk-assessment.client.view.html'
		}).
		state('editRiskAssessment', {
			url: '/risk-assessments/:riskAssessmentId/edit',
			templateUrl: 'modules/risk-assessments/views/edit-risk-assessment.client.view.html'
		});
	}
]);
