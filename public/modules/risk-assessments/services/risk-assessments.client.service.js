'use strict';

//Risk assessments service used to communicate Risk assessments REST endpoints
angular.module('risk-assessments').factory('RiskAssessments', ['$resource',
	function($resource) {
		return $resource('risk-assessments/:riskAssessmentId', { riskAssessmentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);