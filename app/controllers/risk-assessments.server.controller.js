'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	RiskAssessment = mongoose.model('RiskAssessment'),
	_ = require('lodash');

/**
 * Create a Risk assessment
 */
exports.create = function(req, res) {
	var riskAssessment = new RiskAssessment(req.body);
	riskAssessment.user = req.user;

	riskAssessment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(riskAssessment);
		}
	});
};

/**
 * Show the current Risk assessment
 */
exports.read = function(req, res) {
	res.jsonp(req.riskAssessment);
};

/**
 * Update a Risk assessment
 */
exports.update = function(req, res) {
	var riskAssessment = req.riskAssessment ;

	riskAssessment = _.extend(riskAssessment , req.body);

	riskAssessment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(riskAssessment);
		}
	});
};

/**
 * Delete an Risk assessment
 */
exports.delete = function(req, res) {
	var riskAssessment = req.riskAssessment ;

	riskAssessment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(riskAssessment);
		}
	});
};

/**
 * List of Risk assessments
 */
exports.list = function(req, res) { 
	RiskAssessment.find().sort('-created').populate( 'user','displayName').exec(function(err, riskAssessments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(riskAssessments);
		}
	});
};

/**
 * Risk assessment middleware
 */
exports.riskAssessmentByID = function(req, res, next, id) { 
	RiskAssessment.findById(id).populate( 'user', 'displayName').exec(function(err, riskAssessment) {
		if (err) return next(err);
		if (! riskAssessment) return next(new Error('Failed to load Risk assessment ' + id));
		req.riskAssessment = riskAssessment ;
		next();
	});
};

/**
 * Risk assessment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.riskAssessment.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
