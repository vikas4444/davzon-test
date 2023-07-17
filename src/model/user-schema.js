const mongoose = require('mongoose');
const baseSchema = require('./base-schema');
const modelName = 'users';
const Schema = mongoose.Schema;
const _ = require('lodash');
const ObjectId = mongoose.Schema.Types.ObjectId;
const constant = require('../utils/constant');
//Media Schema
const MediaSchema = new Schema({
    name: {
        type: String,
        default: '',
        // required: true
    },
    url: {
        type: String,
        default: '',
        // required: true
    }
}, {
    _id: false
});


const AdditionalInfoSchema = new Schema({
    title: {
        type: String,
        detault : '',
    },
    address: [],
    auditFields: {
        type: baseSchema.AuditFieldSchema
    },
}, { strict: false });

const UserSchema = new Schema({
    auditFields: {
        type: baseSchema.AuditFieldSchema
    },
    profilePic: {
        type: MediaSchema
    },
    // docs: {
    //     companyRegDoc: {
    //         type: MediaSchema
    //     },
    //     pancard: {
    //         type: MediaSchema
    //     }
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        type: String,
        required: true,
        enum: constant.lookup.role

    }],
    myusers:[{
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
            default:null
        },
        email:{
            type: String,
            required: true,
            default:null
            // enum: constant.lookup.role
    
        },
        role:{
            type: String,
            required: true,
            enum: constant.lookup.role,
            default : 'MANAGER'
    
        },
        isVerified: {
            type: Boolean,
            // required: true,
            default: false
        },
        isSent: {
            type: Boolean,
            // required: true,
            default: false
        },
        developers:[{
            userId:{
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true,
                default:null
            },
            email:{
                type: String,
                required: true,
                default:null
                // enum: constant.lookup.role
        
            },
            role:{
                type: String,
                required: true,
                enum: constant.lookup.role,
                default:"DEVELOPER"
        
            },
            isVerified: {
                type: Boolean,
                // required: true,
                default: false
            },
            isSent: {
                type: Boolean,
                // required: true,
                default: false
            },
        }],
    }],
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: [Number], // [22.2475, 14.2547]  [longitude, latitude]
    },
    additionalInfo : [{type:AdditionalInfoSchema}],
},{ strict: false });
// This function will call before each save() so that we can set auditFields.
UserSchema.pre('save', function (next) {
    // console.log(this.auditFields);
    // this.auditFields = { createdAt: new Date() };
    if (_.isNil(this.auditFields)) {
        this.auditFields = {};
    }
    this.auditFields.updatedAt = new Date();
    if (_.isNil(this.auditFields.createdAt)) {
        this.auditFields.createdAt = new Date();
    }
    if (_.isNil(this.auditFields.isActive)) {
        this.auditFields.isActive = true;
    }
    if (_.isNil(this.auditFields.isDeleted)) {
        this.auditFields.isDeleted = false;
    }
    next();
});


module.exports = mongoose.model(modelName, UserSchema); //Compiling schema to model