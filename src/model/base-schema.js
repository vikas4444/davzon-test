const constant = require('../utils/constant');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.auditFields = {
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    ipAddress: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true
    },
    isDeleted: {
        type: Boolean,
        require: true,
        default: false
    },
    reasonForDelete: {
        type: String
    },
    reasonForDeactivate: {
        type: String
    }

};

exports.AuditFieldSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        require: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        require: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true,
        require: true
    }
}, {
    _id: false
});

exports.SEOSchema = new Schema({
    metaTitle: {
        type: String
    },
    metaKeyword: {
        type: String
    },
    metaDescription: {
        type: String
    },
    slug: {
        type: String
    }
}, {
    _id: false
});

exports.AddressSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobile: {
        type: String
    },
    line1: {
        type: String
    },
    line2: {
        type: String
    },
    landmark: {
        type: String
    },
    houseNumber: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    pinCode: {
        type: Number
    },
    state: {
        type: String
    },
    country: {
        type: String
    },

});