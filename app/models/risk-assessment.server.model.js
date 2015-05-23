'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Risk assessment Schema
 */
var RiskAssessmentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Risk assessment name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('RiskAssessment', RiskAssessmentSchema);