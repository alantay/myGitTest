'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Risk assessment Schema
 */
var Ra_user=  new Schema({
    id:{
        type: Number,
        default: '',
        //required: 'Please fill work activity name',
        trim: true
    },
    name:{
        type: String,
        default: '',
        //required: 'Please fill work activity name',
        trim: true
    }

});

var Hazard = new Schema({
    description:{
        type:String,
        default: '',
        //required: 'Please fill description of possible hazard',
        trim: true
    },
    risk_control:[{
        description:{
            type:String,
            default: '',
            //required: 'Please fill description of risk control',
            trim: true
        },
        severity:{
            type:Number,
            default: '',
            //required: 'Please fill severity',
            trim: true
        },
        likelihood:{
            type:Number,
            default: '',
            //required: 'Please fill likelihood',
            trim: true
        },
        additional_risk_control :[{

            description:{
                type:String,
                default: '',
                //required: 'Please fill description of risk control',
                trim: true
            },
            severity:{
                type:Number,
                default: '',
                //required: 'Please fill severity',
                trim: true
            },
            likelihood:{
                type:Number,
                default: '',
                //required: 'Please fill likelihood',
                trim: true
            },
            implementer:[Ra_user],
            due_date : {
                type:Date
                //required:'Please fill in last review date'
            },
            remarks:{
                type:String,
                default: '',
                //required: 'Please fill in remarks',
                trim: true
            }
        }]
    }]
});

var Subtask = new Schema({
    description:{
        type:String
        //required : 'Please fill in subtask description'
    },
    hazard:[Hazard]
});


var Work_activity = new Schema({

    description:{
        type: String,
        default: '',
        //required: 'Please fill work activity name',
        trim: true
    },
    subtask:[Subtask]
});


var RiskAssessmentSchema = new Schema({
	name: {
		type: String,
		default: '',
		//required: 'Please fill Risk assessment name',
		trim: true
	},

    ssn :{
        type: String,
        default: '',
        //required: 'Error, no ssn',
        trim: true
    },
    department : {
        type: String,
        default: '',
        //required: 'Please fill department name',
        trim: true
    },
    process : {
        type: String,
        default: '',
        //required: 'Please fill process name',
        trim: true
    },
    location :{
        type: String,
        default: '',
        //required: 'Please fill location name',
        trim: true
    },

    original_assessment_date :{
        type: Date,
        default: ''
        //required: 'Please fill in the date'
    },

    last_review:{
        type:Date,
        default: Date.now
        //required:'Please fill in last review date'
    },
    next_review:{
        type:Date,
        default: Date.now
        //required:'Please fill in last review date'
    },
    risk_assessment_leader: {
        id:{
            type: Number,
            default: '',
            //required: 'Please fill work activity name',
            trim: true
        },
        name:{
            type: String,
            default: '',
            //required: 'Please fill work activity name',
            trim: true
        }

    },

    risk_assessment_members: [Ra_user],

    approved_by:{
        id:{
            type: Number,
            default: '',
            //required: 'Please fill work activity name',
            trim: true
        },
        name:{
            type: String,
            default: '',
            //required: 'Please fill work activity name',
            trim: true
        }

    },
    approve_date:{
        type:Date,
        default: Date.now
        //required:'Please fill in approved date'
    },


    work_activities :[Work_activity],

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
