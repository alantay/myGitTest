'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var riskAssessments = require('../../app/controllers/risk-assessments.server.controller');

	// Risk assessments Routes
	app.route('/risk-assessments')
		.get(riskAssessments.list)
		.post(users.requiresLogin, riskAssessments.create);

	app.route('/risk-assessments/:riskAssessmentId')
		.get(riskAssessments.read)
		.put(users.requiresLogin, riskAssessments.hasAuthorization, riskAssessments.update)
		.delete(users.requiresLogin, riskAssessments.hasAuthorization, riskAssessments.delete);

	// Finish by binding the Risk assessment middleware
	app.param('riskAssessmentId', riskAssessments.riskAssessmentByID);
};
