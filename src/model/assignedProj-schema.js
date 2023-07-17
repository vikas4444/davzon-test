const mongoose = require('mongoose');
const baseSchema = require('./base-schema');
const modelName = 'assignedProj';
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

const RespMediaSchema = new Schema({
    subject: {
        type: String,
        default: '',
        // required: true
    },
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







const assignedProjSchema = new Schema({
    auditFields: {
        type: baseSchema.AuditFieldSchema
    },
    // name: {
    //     type: String,
    //     required: true
    // },
    // type: {
    //     type: String,
    //     required: true,
    //     enum: constant.lookup.testType

    // },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    testId:{
        type: Schema.Types.ObjectId,
        ref: 'tests',
        required: true
    },
    // durationType: {
    //     type: String,
    //     required: true,
    //     enum: constant.lookup.durationType,
    //     default:"Regular"

    // },
    managers:[{
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },    
        startedOn: {
            type: Date,
            default: null,
        },
        completedOn: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            // required: true
            default:"toDo"
        },
        // duration: {
        //     type: String,
        //     // required: true
        //     default:"Regular"
        // },
        dueDate: {
            type: Date,
            default: new Date(),
        },
        durationType: {
            type: String,
            required: true,
            enum: constant.lookup.durationType,
            default:"Regular"
    
        },
        name: {
            type: String,
            required: true
        },
        developers:[

        ]
    }],
    // sections:[
    //     {
    //         subject: {
    //             type: String,
    //             required: true,
    //         },
    //         duration: {
    //             type: Number,
    //             required: true,
    //         },
    //         totalQue: {
    //             type: Number,
    //             required: true,
    //         },
    //     },
    // }
    // ],
    // diagnostic: {
    //     type: String,
    //     required: true,
    //     enum: constant.lookup.diagnostic

    // },
    // docs: [
    //     {
    //       type: MediaSchema,
    //       default: null
    //     },
        
    //   ],
    // scheduledDate: {
    //     type: Date,
    //     default: new Date(),
    // },
    // dueDate: {
    //     type: Date,
    //     default: new Date(),
    // },


},{ strict: false });
// This function will call before each save() so that we can set auditFields.
assignedProjSchema.pre('save', function (next) {
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



module.exports = mongoose.model(modelName, assignedProjSchema); //Compiling schema to model