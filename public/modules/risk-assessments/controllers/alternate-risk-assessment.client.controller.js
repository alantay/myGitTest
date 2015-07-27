'use strict';

var riskAssessmentApp=angular.module('risk-assessments');
riskAssessmentApp.controller('AlternateRiskAssessmentController', ['$scope','$stateParams', '$location','$log','RiskAssessments',
	function($scope, $stateParams, $location, $log,RiskAssessments) {
        var department;
        var process;
        var location;
        var employees;


        //this.employees = Users.query();
        this.FORM_DETAIL_STATE = 1;
        //this.ADD_RALEADER_STATE = 2;
        //this.APPROVE_BY_STATE = 3;
        this.WORK_ACTIVITY_STATE = 2;
        this.SUBTASK_STATE = 3;
        this.HAZARD_STATE = 4;
        this.RISKCTRL_STATE= 5;
        this.ADDRISKCTRL_STATE= 6;
        this.ADDRISKCTRL_STATE_DETAILS=7;

        this.currentWA=[];
        this.currentST=[];
        this.currentHZ=[];
        this.currentRC=[];
        this.currentARC=[];


        $scope.selected = undefined;
        $scope.users = [
            {name: 'Goh Chok Tong', id: '0001'},
            {name: 'Chee Soon Juan', id: '0002'},
            {name: 'Mas Selamat', id: '0003'},
            {name: 'Tony Tan', id: '0004'},
            {name: 'Lim Kay Tong', id: '0005'}
        ];

        $scope.state = this.FORM_DETAIL_STATE;
        this.work_activities =[];

        this.risk_assessment_members=[];
        this.addRiskAssessmentMember=function(name,id){
            if(!name) return;

            this.risk_assessment_members.push({name:name,id:id});
        };

        this.addImplementer=function(name,id,impArray){
            if(!name) return;
            impArray.push({name:name,id:id});

        };

        this.getRiskMemberNum = function(){
            return this.risk_assessment_members.length;
        };

        this.getPageName = function(num){
            switch(num) {
                case 2:
                    return 'Form Details';
                case 3:
                    return 'Work Activities';
                case 4:
                    return 'Subtasks';
                case 5:
                    return 'Hazard';
                case 6:
                    return 'Risk Controls';
                case 7:
                    return 'Additional Risk Controls';
            }
        };


        //this.moveToAddMember = function(){
        //    $scope.state = this.ADD_RALEADER_STATE;
        //};
        //
        //this.moveToApproveBy = function(){
        //    $scope.state = this.APPROVE_BY_STATE;
        //};

        this.moveToWorkActivities = function(){
            $scope.state = this.WORK_ACTIVITY_STATE;
            $scope.direction='right';
        };


        this.addWorkActivity= function(wa_name){
            if(!wa_name) return;
            if(!this.work_activities) this.work_activities=[];
            this.work_activities.push({description:wa_name});
            $log.info(this.work_activities);

        };

        this.addSubtask= function(st_name){

            if(!st_name) return;
            if(!this.currentWA.subtask) this.currentWA.subtask=[];
            this.currentWA.subtask.push({description:st_name});
        };

        this.addHazard= function(hz_name){

            if(!hz_name) return;
            if(!this.currentST.hazard) this.currentST.hazard=[];
            this.currentST.hazard.push({description:hz_name});
        };

        this.addRiskCtrl= function(rc_name){
            if(!rc_name) return;
            if(!this.currentHZ.risk_control) this.currentHZ.risk_control=[];
            this.currentHZ.risk_control.push({description:rc_name});
        };

        this.addADDRiskCtrl= function(addRc_name){
            if(!addRc_name) return;
            if(!this.currentRC.additional_risk_control) this.currentRC.additional_risk_control=[];
            this.currentRC.additional_risk_control.push({description:addRc_name, implementer:[]});
        };

        this.drillIntoWA = function(wa){
            $scope.state = this.SUBTASK_STATE;
            this.currentWA = wa;
            $scope.direction='right';
        };

        this.drillIntoST = function(st){
            $scope.state = this.HAZARD_STATE;
            this.currentST = st;
            $scope.direction='right';
        };

        this.drillIntoHZ = function(hz){
            $scope.state = this.RISKCTRL_STATE;
            this.currentHZ = hz;
            $scope.direction='right';
        };

        this.drillIntoRC = function(rc){
            $scope.state = this.ADDRISKCTRL_STATE;
            this.currentRC = rc;
            $scope.direction='right';
        };

        this.drillIntoARC = function(arc){
            $scope.state = this.ADDRISKCTRL_STATE_DETAILS;
            this.currentARC = arc;
            $scope.direction='right';
        };

        this.moveBack=function(){
            $scope.state--;
            $scope.direction='left';
        };

        this.deleteMember=function(idx){
            this.risk_assessment_members.splice(idx,1);
        };


        /* Saving the Form here */



        this.saveForm=function(){
            $log.info(this.work_activities);
            var riskAssessment = new RiskAssessments ({
                name: $scope.name,
                department: $scope.department,
                process: $scope.process,
                location: $scope.location,
                original_assessment_date:this.original_assessment_date,
                last_review: this.last_review_date,
                next_review: this.next_review_date,

                risk_assessment_leader:$scope.risk_assessment_leader,
                approved_by: $scope.approved_by,
                approve_date: $scope.approve_date,
                risk_assessment_members:[],
                work_activities:[]

                //staffID:  scope.data.selectedCard.id,
                //children:[]
            });


            for(var k = 0; k<this.risk_assessment_members.length; k++){

                riskAssessment.risk_assessment_members[k]=this.risk_assessment_members[k];
            }
            for(var j = 0; j<this.work_activities.length; j++){

                riskAssessment.work_activities[j]=this.work_activities[j];
            }

            // Redirect after save
            riskAssessment.$save(function(response) {
                // Clear form fields
                //$scope.name = '';
               // alert('fine');
                $location.path('/risk-assessments');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;

               // alert('error');
            });
        };

    }
]);

riskAssessmentApp.directive('numbersOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                // this next if is necessary for when using ng-required on your input.
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});


riskAssessmentApp.controller('DatepickerDemoCtrl', function ($scope) {

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    this.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = this.formats[0];


    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
});



