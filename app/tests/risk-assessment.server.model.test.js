'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	RiskAssessment = mongoose.model('RiskAssessment');

/**
 * Globals
 */
var user, riskAssessment;

/**
 * Unit tests
 */
describe('Risk assessment Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			riskAssessment = new RiskAssessment({
				name: 'Risk assessment Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return riskAssessment.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			riskAssessment.name = '';

			return riskAssessment.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		RiskAssessment.remove().exec();
		User.remove().exec();

		done();
	});
});