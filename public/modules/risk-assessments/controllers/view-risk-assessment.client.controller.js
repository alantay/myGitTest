'use strict';
// Risk assessments controller
var riskAssessmentApp=angular.module('risk-assessments');
riskAssessmentApp.controller('ViewRiskAssessmentsController', ['$scope','$log', '$stateParams',  'Authentication', 'RiskAssessments',
    function($scope, $log, $stateParams, Authentication, RiskAssessments) {
        this.authentication = Authentication;
        var currentWaIndex=1;
        var printed = false;
        //this.riskAssessment=RiskAssessments.query();
       // $scope.riskAssessment=this.riskAssessment;

        this.uniqueIdArr=[];

        var findOne = function() {
            return  RiskAssessments.get({
                riskAssessmentId: $stateParams.riskAssessmentId
            });
        };

        this.riskAssessment = findOne();
        $scope.riskAssessment = this.riskAssessment;

        this.currentWaIndex=function(index)
        {
            if(printed==false){
                printed = true;
                return index;
            }

        };

        this.checkUnique = function(id){

            if(this.uniqueIdArr.indexOf(id) > -1){
                return false;
            }else{
                this.uniqueIdArr.push(id);
                return true;
            }
        };
    }]);
