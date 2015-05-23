'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	RiskAssessment = mongoose.model('RiskAssessment'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, riskAssessment;

/**
 * Risk assessment routes tests
 */
describe('Risk assessment CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Risk assessment
		user.save(function() {
			riskAssessment = {
				name: 'Risk assessment Name'
			};

			done();
		});
	});

	it('should be able to save Risk assessment instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Risk assessment
				agent.post('/risk-assessments')
					.send(riskAssessment)
					.expect(200)
					.end(function(riskAssessmentSaveErr, riskAssessmentSaveRes) {
						// Handle Risk assessment save error
						if (riskAssessmentSaveErr) done(riskAssessmentSaveErr);

						// Get a list of Risk assessments
						agent.get('/risk-assessments')
							.end(function(riskAssessmentsGetErr, riskAssessmentsGetRes) {
								// Handle Risk assessment save error
								if (riskAssessmentsGetErr) done(riskAssessmentsGetErr);

								// Get Risk assessments list
								var riskAssessments = riskAssessmentsGetRes.body;

								// Set assertions
								(riskAssessments[0].user._id).should.equal(userId);
								(riskAssessments[0].name).should.match('Risk assessment Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Risk assessment instance if not logged in', function(done) {
		agent.post('/risk-assessments')
			.send(riskAssessment)
			.expect(401)
			.end(function(riskAssessmentSaveErr, riskAssessmentSaveRes) {
				// Call the assertion callback
				done(riskAssessmentSaveErr);
			});
	});

	it('should not be able to save Risk assessment instance if no name is provided', function(done) {
		// Invalidate name field
		riskAssessment.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Risk assessment
				agent.post('/risk-assessments')
					.send(riskAssessment)
					.expect(400)
					.end(function(riskAssessmentSaveErr, riskAssessmentSaveRes) {
						// Set message assertion
						(riskAssessmentSaveRes.body.message).should.match('Please fill Risk assessment name');
						
						// Handle Risk assessment save error
						done(riskAssessmentSaveErr);
					});
			});
	});

	it('should be able to update Risk assessment instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Risk assessment
				agent.post('/risk-assessments')
					.send(riskAssessment)
					.expect(200)
					.end(function(riskAssessmentSaveErr, riskAssessmentSaveRes) {
						// Handle Risk assessment save error
						if (riskAssessmentSaveErr) done(riskAssessmentSaveErr);

						// Update Risk assessment name
						riskAssessment.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Risk assessment
						agent.put('/risk-assessments/' + riskAssessmentSaveRes.body._id)
							.send(riskAssessment)
							.expect(200)
							.end(function(riskAssessmentUpdateErr, riskAssessmentUpdateRes) {
								// Handle Risk assessment update error
								if (riskAssessmentUpdateErr) done(riskAssessmentUpdateErr);

								// Set assertions
								(riskAssessmentUpdateRes.body._id).should.equal(riskAssessmentSaveRes.body._id);
								(riskAssessmentUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Risk assessments if not signed in', function(done) {
		// Create new Risk assessment model instance
		var riskAssessmentObj = new RiskAssessment(riskAssessment);

		// Save the Risk assessment
		riskAssessmentObj.save(function() {
			// Request Risk assessments
			request(app).get('/risk-assessments')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Risk assessment if not signed in', function(done) {
		// Create new Risk assessment model instance
		var riskAssessmentObj = new RiskAssessment(riskAssessment);

		// Save the Risk assessment
		riskAssessmentObj.save(function() {
			request(app).get('/risk-assessments/' + riskAssessmentObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', riskAssessment.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Risk assessment instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Risk assessment
				agent.post('/risk-assessments')
					.send(riskAssessment)
					.expect(200)
					.end(function(riskAssessmentSaveErr, riskAssessmentSaveRes) {
						// Handle Risk assessment save error
						if (riskAssessmentSaveErr) done(riskAssessmentSaveErr);

						// Delete existing Risk assessment
						agent.delete('/risk-assessments/' + riskAssessmentSaveRes.body._id)
							.send(riskAssessment)
							.expect(200)
							.end(function(riskAssessmentDeleteErr, riskAssessmentDeleteRes) {
								// Handle Risk assessment error error
								if (riskAssessmentDeleteErr) done(riskAssessmentDeleteErr);

								// Set assertions
								(riskAssessmentDeleteRes.body._id).should.equal(riskAssessmentSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Risk assessment instance if not signed in', function(done) {
		// Set Risk assessment user 
		riskAssessment.user = user;

		// Create new Risk assessment model instance
		var riskAssessmentObj = new RiskAssessment(riskAssessment);

		// Save the Risk assessment
		riskAssessmentObj.save(function() {
			// Try deleting Risk assessment
			request(app).delete('/risk-assessments/' + riskAssessmentObj._id)
			.expect(401)
			.end(function(riskAssessmentDeleteErr, riskAssessmentDeleteRes) {
				// Set message assertion
				(riskAssessmentDeleteRes.body.message).should.match('User is not logged in');

				// Handle Risk assessment error error
				done(riskAssessmentDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		RiskAssessment.remove().exec();
		done();
	});
});