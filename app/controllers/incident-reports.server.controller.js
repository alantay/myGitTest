'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	IncidentReport = mongoose.model('IncidentReport'),
	_ = require('lodash');

/**
 * Create a Incident report
 */
exports.create = function(req, res) {
	var incidentReport = new IncidentReport(req.body);
	incidentReport.user = req.user;

	incidentReport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(incidentReport);
		}
	});
};

/**
 * Show the current Incident report
 */
exports.read = function(req, res) {
	res.jsonp(req.incidentReport);
};

/**
 * Update a Incident report
 */
exports.update = function(req, res) {
	var incidentReport = req.incidentReport ;

	incidentReport = _.extend(incidentReport , req.body);

	incidentReport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(incidentReport);
		}
	});
};

/**
 * Delete an Incident report
 */
exports.delete = function(req, res) {
	var incidentReport = req.incidentReport ;

	incidentReport.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(incidentReport);
		}
	});
};

/**
 * List of Incident reports
 */
exports.list = function(req, res) { 
	IncidentReport.find().sort('-created').populate('user', 'displayName').exec(function(err, incidentReports) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(incidentReports);
		}
	});
};

/**
 * Incident report middleware
 */
exports.incidentReportByID = function(req, res, next, id) { 
	IncidentReport.findById(id).populate('user', 'displayName').exec(function(err, incidentReport) {
		if (err) return next(err);
		if (! incidentReport) return next(new Error('Failed to load Incident report ' + id));
		req.incidentReport = incidentReport ;
		next();
	});
};

/**
 * Incident report authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.incidentReport.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
