'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Risk assessment Schema
 */
var RiskControl = new Schema({
    description:{
        type:String,
        default: '',
        required: 'Please fill description of risk control',
        trim: true
    },
    severity:{
        type:Number,
        default: '',
        required: 'Please fill severity',
        trim: true
    },
    likelihood:{
        type:Number,
        default: '',
        required: 'Please fill likelihood',
        trim: true
    }
});

var PossibleDanger = new Schema({
    description:{
        type:String,
        default: '',
        required: 'Please fill description of possible danger',
        trim: true
    },
    risk_control:{
        description:{
            type:String,
            default: '',
            required: 'Please fill description of risk control',
            trim: true
        },
        severity:{
            type:Number,
            default: '',
            required: 'Please fill severity',
            trim: true
        },
        likelihood:{
            type:Number,
            default: '',
            required: 'Please fill likelihood',
            trim: true
        }

    },

    implementation :[{
        type: Schema.ObjectId,
        ref: 'User'
    }],

    due_date : {
        type:Date,
        required:'Please fill in last review date'
    },
    remarks:{
        type:String,
        default: '',
        required: 'Please fill in remarks',
        trim: true
    }
});

var Hazard = new Schema({
    hazard_type:{
        type:String,
        required : 'Please fill in hazard type'
    },
    possible_danger:[PossibleDanger]
});

var RiskAssessmentDetail = new Schema({
    last_review:{
        type:Date,
        required:'Please fill in last review date'
    },
    next_review:{
        type:Date,
        required:'Please fill in last review date'
    },
    ra_leader: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    approved:[{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    work_activity:{
        type: String,
        default: '',
        required: 'Please fill work activity name',
        trim: true
    },
    hazard:[Hazard]
});


var RiskAssessmentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Risk assessment name',
		trim: true
	},

    ssn :{
        type: String,
        default: '',
        required: 'Error, no ssn',
        trim: true
    },
    department : {
        type: String,
        default: '',
        required: 'Please fill department name',
        trim: true
    },
    process : {
        type: String,
        default: '',
        required: 'Please fill process name',
        trim: true
    },
    location :{
        type: String,
        default: '',
        required: 'Please fill location name',
        trim: true
    },

    original_assessment_date :{
        type: Date,
        default: '',
        required: 'Please fill in the date'
    },
    versions :[RiskAssessmentDetail],

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
