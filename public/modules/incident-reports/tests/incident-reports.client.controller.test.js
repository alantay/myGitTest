'use strict';

(function() {
	// Incident reports Controller Spec
	describe('Incident reports Controller Tests', function() {
		// Initialize global variables
		var IncidentReportsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Incident reports controller.
			IncidentReportsController = $controller('IncidentReportsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Incident report object fetched from XHR', inject(function(IncidentReports) {
			// Create sample Incident report using the Incident reports service
			var sampleIncidentReport = new IncidentReports({
				name: 'New Incident report'
			});

			// Create a sample Incident reports array that includes the new Incident report
			var sampleIncidentReports = [sampleIncidentReport];

			// Set GET response
			$httpBackend.expectGET('incident-reports').respond(sampleIncidentReports);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.incidentReports).toEqualData(sampleIncidentReports);
		}));

		it('$scope.findOne() should create an array with one Incident report object fetched from XHR using a incidentReportId URL parameter', inject(function(IncidentReports) {
			// Define a sample Incident report object
			var sampleIncidentReport = new IncidentReports({
				name: 'New Incident report'
			});

			// Set the URL parameter
			$stateParams.incidentReportId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/incident-reports\/([0-9a-fA-F]{24})$/).respond(sampleIncidentReport);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.incidentReport).toEqualData(sampleIncidentReport);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(IncidentReports) {
			// Create a sample Incident report object
			var sampleIncidentReportPostData = new IncidentReports({
				name: 'New Incident report'
			});

			// Create a sample Incident report response
			var sampleIncidentReportResponse = new IncidentReports({
				_id: '525cf20451979dea2c000001',
				name: 'New Incident report'
			});

			// Fixture mock form input values
			scope.name = 'New Incident report';

			// Set POST response
			$httpBackend.expectPOST('incident-reports', sampleIncidentReportPostData).respond(sampleIncidentReportResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Incident report was created
			expect($location.path()).toBe('/incident-reports/' + sampleIncidentReportResponse._id);
		}));

		it('$scope.update() should update a valid Incident report', inject(function(IncidentReports) {
			// Define a sample Incident report put data
			var sampleIncidentReportPutData = new IncidentReports({
				_id: '525cf20451979dea2c000001',
				name: 'New Incident report'
			});

			// Mock Incident report in scope
			scope.incidentReport = sampleIncidentReportPutData;

			// Set PUT response
			$httpBackend.expectPUT(/incident-reports\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/incident-reports/' + sampleIncidentReportPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid incidentReportId and remove the Incident report from the scope', inject(function(IncidentReports) {
			// Create new Incident report object
			var sampleIncidentReport = new IncidentReports({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Incident reports array and include the Incident report
			scope.incidentReports = [sampleIncidentReport];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/incident-reports\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleIncidentReport);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.incidentReports.length).toBe(0);
		}));
	});
}());