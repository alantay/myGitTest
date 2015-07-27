'use strict';
var MAX_ALLOWABLE_RPN = 2; // RPN is severity multiply likelihood

// Risk assessments controller
var riskAssessmentApp=angular.module('risk-assessments');
riskAssessmentApp.controller('RiskAssessmentsController', ['$scope','$log', '$stateParams',  'Authentication', 'RiskAssessments',
	function($scope, $log, $stateParams, Authentication, RiskAssessments) {
        this.authentication = Authentication;
       // this.riskAssessments = RiskAssessments.query();

        $scope.find = function() {
            $scope.riskAssessments = RiskAssessments.query();
            $log.info($scope.riskAssessments);
        };

        $scope.findOne = function() {
            $scope.riskAssessment = RiskAssessments.get({
                riskAssessmentId: $stateParams.riskAssessmentId
            });
        };
    }
]);


riskAssessmentApp.controller('RiskAssessmentsCreateController', ['$scope', 'RiskAssessments','$log',
    function($scope,  RiskAssessments,$log) {
        var addWorkActivity;
        var addAdditionalRiskControl;
        var removeAdditionalRiskControl;
        var addExistingRiskControl;
        var addHazard;
        var addSubtask;
        var riskNumChanged;



        addWorkActivity=function(){
            var wa = createWorkActivity();
            this.push(wa);
            wa.name+= ' #'+this.length;
        };
        this.workActivities = [];
        this.workActivities.addWorkActivity=addWorkActivity;
        this.workActivities.addWorkActivity();

        function createWorkActivity(){
            var wa={name:'Work Activity',subtasks:[]};
            wa.addSubtask = addSubtaskFunc();
            wa.addSubtask();
            return wa;
        }


        function createSubtask(){
            var subtask = {name:'Subtask',hazards:[]};
            subtask.addHazard = addHazardFunc();
            subtask.addHazard();
            return subtask;
        }

        function addSubtaskFunc(){
            return function(){
                var subtask = createSubtask();
                this.subtasks.push(subtask);
                subtask.name+= ' #'+this.subtasks.length;
            };
        }

        function addHazardFunc(){
           return function(){
               var hazard = createHazard();
               this.hazards.push(hazard);
               hazard.name+= ' #'+this.hazards.length;
           };
        }


        function createHazard(){
            var hazard = {name:'Hazard ',existingRiskControls:[]};
            hazard.addExistingRiskControl = addExistingRiskControlFunc();
            hazard.addExistingRiskControl();
            return hazard;
        }

        function addExistingRiskControlFunc(){
            return function(){
                var rc = createExistingRiskControl();
                this.existingRiskControls.push(rc);
                rc.name += ' #'+this.existingRiskControls.length;
            };
        }

        function createExistingRiskControl(){
            var rc = {name:'Existing Risk Control',additionalRiskControls:[]};
            rc.addAdditionalRiskControl = addAdditionalRiskControlFunc();
            rc.removeAdditionalRiskControl = removeAdditionalRiskControlFunc();
            rc.riskNumChanged = riskNumChangedFunc();
            return rc;
        }

        this.riskAssessmentMembers=[{user_id:''}];
        this.addRiskAssessmentMember=function(){
            this.riskAssessmentMembers.push({user_id:''});
        };


        function addAdditionalRiskControlFunc(){
            return function(){
                $log.info('addAdditionalRiskControl');
                if(this.additionalRiskControls.length==0){
                    this.additionalRiskControls.push({risk_control_name:''});
                }
            };
        }

        function removeAdditionalRiskControlFunc(){
            return function(){
                $log.info('removeAdditionalRiskControl');
                if(this.additionalRiskControls){
                    this.additionalRiskControls.splice(0, this.additionalRiskControls.length);
                }
            };
        }


        function riskNumChangedFunc(){
           return function (riskObj){
                $log.info('riskNumChanged');
                if(riskObj.severity && riskObj.likelihood){
                    riskObj.rpn = riskObj.severity * riskObj.likelihood;
                    if(riskObj.rpn > MAX_ALLOWABLE_RPN ){
                        this.addAdditionalRiskControl();
                    }else{
                        this.removeAdditionalRiskControl();
                    }
                }
            };
        }


    }
]);


