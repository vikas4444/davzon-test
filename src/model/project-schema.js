const mongoose = require('mongoose');
const baseSchema = require('./base-schema');
const modelName = 'project';
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




const projSchema = new Schema({
    auditFields: {
        type: baseSchema.AuditFieldSchema
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        // enum: constant.lookup.testType

    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    durationType: {
        type: String,
        required: true,
        enum: constant.lookup.durationType,
        default:"Regular"

    },
    status: {
        type: String,
        // required: true
        default:"toDo"
    },
    // duration: {
    //     type: Number,
    //     // required: true
    //     default:60
    // },
    docs: [
        {
          type: MediaSchema,
          default: null
        },
        
      ],
    // scheduledDate: {
    //     type: Date,
    //     default: new Date(),
    // },
    dueDate: {
        type: Date,
        default: new Date(),
    },


},{ strict: false });
// This function will call before each save() so that we can set auditFields.
projSchema.pre('save', function (next) {
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



module.exports = mongoose.model(modelName, projSchema); //Compiling schema to model