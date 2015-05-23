'use strict';

(function() {
	// Risk assessments Controller Spec
	describe('Risk assessments Controller Tests', function() {
		// Initialize global variables
		var RiskAssessmentsController,
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

			// Initialize the Risk assessments controller.
			RiskAssessmentsController = $controller('RiskAssessmentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Risk assessment object fetched from XHR', inject(function(RiskAssessments) {
			// Create sample Risk assessment using the Risk assessments service
			var sampleRiskAssessment = new RiskAssessments({
				name: 'New Risk assessment'
			});

			// Create a sample Risk assessments array that includes the new Risk assessment
			var sampleRiskAssessments = [sampleRiskAssessment];

			// Set GET response
			$httpBackend.expectGET('risk-assessments').respond(sampleRiskAssessments);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.riskAssessments).toEqualData(sampleRiskAssessments);
		}));

		it('$scope.findOne() should create an array with one Risk assessment object fetched from XHR using a riskAssessmentId URL parameter', inject(function(RiskAssessments) {
			// Define a sample Risk assessment object
			var sampleRiskAssessment = new RiskAssessments({
				name: 'New Risk assessment'
			});

			// Set the URL parameter
			$stateParams.riskAssessmentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/risk-assessments\/([0-9a-fA-F]{24})$/).respond(sampleRiskAssessment);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.riskAssessment).toEqualData(sampleRiskAssessment);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(RiskAssessments) {
			// Create a sample Risk assessment object
			var sampleRiskAssessmentPostData = new RiskAssessments({
				name: 'New Risk assessment'
			});

			// Create a sample Risk assessment response
			var sampleRiskAssessmentResponse = new RiskAssessments({
				_id: '525cf20451979dea2c000001',
				name: 'New Risk assessment'
			});

			// Fixture mock form input values
			scope.name = 'New Risk assessment';

			// Set POST response
			$httpBackend.expectPOST('risk-assessments', sampleRiskAssessmentPostData).respond(sampleRiskAssessmentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Risk assessment was created
			expect($location.path()).toBe('/risk-assessments/' + sampleRiskAssessmentResponse._id);
		}));

		it('$scope.update() should update a valid Risk assessment', inject(function(RiskAssessments) {
			// Define a sample Risk assessment put data
			var sampleRiskAssessmentPutData = new RiskAssessments({
				_id: '525cf20451979dea2c000001',
				name: 'New Risk assessment'
			});

			// Mock Risk assessment in scope
			scope.riskAssessment = sampleRiskAssessmentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/risk-assessments\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/risk-assessments/' + sampleRiskAssessmentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid riskAssessmentId and remove the Risk assessment from the scope', inject(function(RiskAssessments) {
			// Create new Risk assessment object
			var sampleRiskAssessment = new RiskAssessments({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Risk assessments array and include the Risk assessment
			scope.riskAssessments = [sampleRiskAssessment];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/risk-assessments\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRiskAssessment);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.riskAssessments.length).toBe(0);
		}));
	});
}());