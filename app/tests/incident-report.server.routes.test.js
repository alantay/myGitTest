'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	IncidentReport = mongoose.model('IncidentReport'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, incidentReport;

/**
 * Incident report routes tests
 */
describe('Incident report CRUD tests', function() {
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

		// Save a user to the test db and create new Incident report
		user.save(function() {
			incidentReport = {
				name: 'Incident report Name'
			};

			done();
		});
	});

	it('should be able to save Incident report instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Incident report
				agent.post('/incident-reports')
					.send(incidentReport)
					.expect(200)
					.end(function(incidentReportSaveErr, incidentReportSaveRes) {
						// Handle Incident report save error
						if (incidentReportSaveErr) done(incidentReportSaveErr);

						// Get a list of Incident reports
						agent.get('/incident-reports')
							.end(function(incidentReportsGetErr, incidentReportsGetRes) {
								// Handle Incident report save error
								if (incidentReportsGetErr) done(incidentReportsGetErr);

								// Get Incident reports list
								var incidentReports = incidentReportsGetRes.body;

								// Set assertions
								(incidentReports[0].user._id).should.equal(userId);
								(incidentReports[0].name).should.match('Incident report Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Incident report instance if not logged in', function(done) {
		agent.post('/incident-reports')
			.send(incidentReport)
			.expect(401)
			.end(function(incidentReportSaveErr, incidentReportSaveRes) {
				// Call the assertion callback
				done(incidentReportSaveErr);
			});
	});

	it('should not be able to save Incident report instance if no name is provided', function(done) {
		// Invalidate name field
		incidentReport.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Incident report
				agent.post('/incident-reports')
					.send(incidentReport)
					.expect(400)
					.end(function(incidentReportSaveErr, incidentReportSaveRes) {
						// Set message assertion
						(incidentReportSaveRes.body.message).should.match('Please fill Incident report name');
						
						// Handle Incident report save error
						done(incidentReportSaveErr);
					});
			});
	});

	it('should be able to update Incident report instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Incident report
				agent.post('/incident-reports')
					.send(incidentReport)
					.expect(200)
					.end(function(incidentReportSaveErr, incidentReportSaveRes) {
						// Handle Incident report save error
						if (incidentReportSaveErr) done(incidentReportSaveErr);

						// Update Incident report name
						incidentReport.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Incident report
						agent.put('/incident-reports/' + incidentReportSaveRes.body._id)
							.send(incidentReport)
							.expect(200)
							.end(function(incidentReportUpdateErr, incidentReportUpdateRes) {
								// Handle Incident report update error
								if (incidentReportUpdateErr) done(incidentReportUpdateErr);

								// Set assertions
								(incidentReportUpdateRes.body._id).should.equal(incidentReportSaveRes.body._id);
								(incidentReportUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Incident reports if not signed in', function(done) {
		// Create new Incident report model instance
		var incidentReportObj = new IncidentReport(incidentReport);

		// Save the Incident report
		incidentReportObj.save(function() {
			// Request Incident reports
			request(app).get('/incident-reports')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Incident report if not signed in', function(done) {
		// Create new Incident report model instance
		var incidentReportObj = new IncidentReport(incidentReport);

		// Save the Incident report
		incidentReportObj.save(function() {
			request(app).get('/incident-reports/' + incidentReportObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', incidentReport.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Incident report instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Incident report
				agent.post('/incident-reports')
					.send(incidentReport)
					.expect(200)
					.end(function(incidentReportSaveErr, incidentReportSaveRes) {
						// Handle Incident report save error
						if (incidentReportSaveErr) done(incidentReportSaveErr);

						// Delete existing Incident report
						agent.delete('/incident-reports/' + incidentReportSaveRes.body._id)
							.send(incidentReport)
							.expect(200)
							.end(function(incidentReportDeleteErr, incidentReportDeleteRes) {
								// Handle Incident report error error
								if (incidentReportDeleteErr) done(incidentReportDeleteErr);

								// Set assertions
								(incidentReportDeleteRes.body._id).should.equal(incidentReportSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Incident report instance if not signed in', function(done) {
		// Set Incident report user 
		incidentReport.user = user;

		// Create new Incident report model instance
		var incidentReportObj = new IncidentReport(incidentReport);

		// Save the Incident report
		incidentReportObj.save(function() {
			// Try deleting Incident report
			request(app).delete('/incident-reports/' + incidentReportObj._id)
			.expect(401)
			.end(function(incidentReportDeleteErr, incidentReportDeleteRes) {
				// Set message assertion
				(incidentReportDeleteRes.body.message).should.match('User is not logged in');

				// Handle Incident report error error
				done(incidentReportDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		IncidentReport.remove().exec();
		done();
	});
});