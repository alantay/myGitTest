'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var incidentReports = require('../../app/controllers/incident-reports.server.controller');

	// Incident reports Routes
	app.route('/incident-reports')
		.get(incidentReports.list)
		.post(users.requiresLogin, incidentReports.create);

	app.route('/incident-reports/:incidentReportId')
		.get(incidentReports.read)
		.put(users.requiresLogin, incidentReports.hasAuthorization, incidentReports.update)
		.delete(users.requiresLogin, incidentReports.hasAuthorization, incidentReports.delete);

	// Finish by binding the Incident report middleware
	app.param('incidentReportId', incidentReports.incidentReportByID);
};
