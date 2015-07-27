'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Incident report Schema
 */
var Injury=  new Schema({
    nature:{
        type:String,
        default: '',
        trim: true
    },
    body_part:{
        type:String,
        default: '',
        trim: true
    }
});

var IncidentReportSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Incident report name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    reference_number:{
        type:String,
        default: '',
        required: 'Please fill reference number',
        trim: true
    },
    notification_type:{
        type:String,
        default: '',
        trim: true
    },
    notification_date:{
        type: Date,
        default: Date.now
    },
    informant:{
        type:{
            type:String,
            default: '',
            trim: true
        },
        id:{
            type:String,
            default: '',
            trim: true
        },
        name:{
            type:String,
            default: '',
            trim: true
        },
        contact:{
            type:String,
            default: '',
            trim: true
        },
        email:{
            type:String,
            default: '',
            trim: true
        }
    },
    organisation:{
        name:{
            type:String,
            default: '',
            trim: true
        },
        UEN:{
            type:String,
            default: '',
            trim: true
        },
        num_employees:{
            type:Number,
            default: '',
            trim: true
        },
        address:{
            type:String,
            default: '',
            trim: true
        },
        contact:{
            type:String,
            default: '',
            trim: true
        },
        fax:{
            type:String,
            default: '',
            trim: true
        },
        email:{
            type:String,
            default: '',
            trim: true
        }
    },
    accident:{
        date: {
            type: Date,
            default: Date.now
        },
        time: {
            type: Date,
            default: Date.now
        },
        location:{
            type:String,
            default: '',
            trim: true
        },
        workplace_no:{
            type:String,
            default: '',
            trim: true
        },
        workplace_name:{
            type:String,
            default: '',
            trim: true
        },
        address:{
            type:String,
            default: '',
            trim: true
        },
        UEN:{
            type:String,
            default: '',
            trim: true
        },
        type:{
            type:String,
            default: '',
            trim: true
        },
        causes:{
            type:String,
            default: '',
            trim: true
        },
        description:{
            type:String,
            default: '',
            trim: true
        },
        injured:{
            type:Boolean
        }
    },
    injured_person:{
        id:{
            type:String,
            default: '',
            trim: true
        },
        name:{
            type:String,
            default: '',
            trim: true
        },
        nationality:{
            type:String,
            default: '',
            trim: true
        },
        date_of_birth: {
            type: Date,
            default: Date.now
        },
        gender:{
            type:String,
            default: '',
            trim: true
        },
        race:{
            type:String,
            default: '',
            trim: true
        },
        address:{
            type:String,
            default: '',
            trim: true
        },
        contact:{
            type:String,
            default: '',
            trim: true
        },
        occupation:{
            type:String,
            default: '',
            trim: true
        },
        employer:{
            type:String,
            default: '',
            trim: true
        },
        employer_address:{
            type:String,
            default: '',
            trim: true
        },
        employment_start_date:{
            type: Date,
            default: Date.now
        },
        earnings:{
            type:Number,
            trim: true
        },
        injuries:[Injury],

        hospitalised:{
            type:Boolean
        },
        num_medical_leave:{
            type:Number,
            trim: true
        },
        hospital:{
            type:String,
            default: '',
            trim: true
        },
        time_start_work:{
            type: Date,
            default: Date.now
        },
        working_overtime:{
            type:Boolean
        },
        official_duty:{
            type:Boolean
        },
        insurer:{
            type:String,
            trim:true
        },
        insurance_policy_num:{
            type:String,
            trim: true
        }

    }
});




/*
 Identification Type/No Name
 Nationality
 Date of Birth
 Gender
 Race
 Residential Address
 BEFORE THE EMPLOYEE ROTATE THE BARREL TO ALLOW THE OPENING OF THE BARREL TO FACE
 THE UNLOADING TRAY ON THE GROUND. THE INCIDENT OCCURRED WHEN THE BARREL SLIPPED OFF THE SUPPORTING ARMS DUE TO THE ROTATING MOTION. THE BARREL SLIPPED TOWARDS THE EMPLOYEE OPERATING THE CONTROL DEVICE. THE EMPLOYEE USES HIS HANDS TO BLOCK THE BARREL AND RESULTS TO HIS RIGHT HAND INDEX FINGER TIP BEING TRAPPED BY THE ROTATING GEAR. THE RIGHT SUPPORTING ARM WAS OBSERVED TO BE SLIGHTLY BENT. THUS, WE DEDUCED THAT THE SLIGHTLY BENT RIGHT SUPPORTING ARM MAY CAUSE THE ROTATING BARREL TO SWING DUE TO UNEVEN SUPPORT WHICH RESULTED TO THE BARREL TO SLIP OFF POSITION. THE FRESH OF THE TIP OF THE RIGHT INDEX FINGER WAS REMOVED BY THE ROTATING GEARS. FIRST AID WAS APPLIED TO THE EMPLOYEE TO PREVENT ANY INFECTION AND STOPPING THE BLOOD BEFORE SENDING TO NUH FOR DAY HAND RECONSTRUCTIVE MICROSURGERY AND WAS GIVEN 18 DAYS OF MC TILL THE NEXT REVIEW ON 16 JUN 2014. THE RECOVERY OPERATION WAS CEASED AND CONTRACTOR WAS CALLED IN ON
 THE SAME DAY TO EXAMINE THE RECOVERY LINE BEFORE RESUMING PRODUCTION. CONCURRENTLY, PRODUCTION MANAGER WAS TASKED TO CONDUCT A TOOLBOX MEETING FOR ALL WORKERS TO SHARE ABOUT THE INCIDENT AND ALSO TO RECAP THE SAFETY PROCEDURES WHILE OPERATING MACHINERIES. TWO METAL PLATES WERE WELDED TO THE END OF EACH SUPPORTING ARMS TO PREVENT THE BARREL FROM SLIPPING OFF. WORKING INSTRUCTIONS WAS ALSO UPDATED BY GM TO CAUTION WORKERS NOT TO STAND IN THE WAY OF THE BARREL WHILE IT IS ROTATING ON THE SUPPORTING ARMS AND TO MOVE IN TO OPEN THE BARREL FOR LOADING/ UNLOADING ONLY WHEN IT IS IN COMPLETE STOP. THE ABOVE MENTIONED UPDATE WAS THEN COMMUNICATED TO ALL WORKERS BY THE GM ON 4TH JUN 2014.
 YES
 FIN / G0090952T XIE CHI CHINESE 18/06/1974 MALE
 CHINESE
 60 TUAS SOUTH AVENUE 2 TUAS BAY INDUSTRIAL CENTRE SINGAPORE 637527
 ￼
 Contact No
 Occupation
 Employer Organisation Name
 Employer Mailing Address
 Start Date of Employment Average Monthly Earnings
 Percentage of manual work performed by the injured person
 Did the accident result in death of the injured person?

 * */
mongoose.model('IncidentReport', IncidentReportSchema);
