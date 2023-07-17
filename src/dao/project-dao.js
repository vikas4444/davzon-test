const TestModel = require('../model/project-schema');


// For Create User 
exports.addTest = (body,user) => {
    return new TestModel({
        name: body.name,
        type: body.type,
        dueDate: body.dueDate,
        docs: body.docs,
        userId:user._id,
        sections:body.sections,
        scoring:body.scoring
        // location: body.location
    }).save();
};


//get single document by condition
exports.getOne = (condition, requireFields) => {
    if (requireFields) {
        return TestModel.findOne(condition, requireFields)
    } else {
        return TestModel.findOne(condition)
    }
}

//Update By Condition
exports.addNewUserAddress = (condition, updateFields) => {
    return TestModel.updateOne(condition, {
        $addToSet: updateFields
    });
};

//Update By Condition
exports.updateByCondition = (condition, updateFields) => {
    return TestModel.updateOne(condition, updateFields);
};

//get all documents 
exports.getByConditions = (conditions = {},requireFields) => {
    return TestModel.find(conditions,requireFields).limit(50);
}
exports.getAll = (condition, requireFields) => {
    if (requireFields) {
        return TestModel.find(condition, requireFields)
    } else {
        return TestModel.find(condition)
    }
}

//get user on id and mobile
exports.getById = (id, mobile) => {
    return TestModel.findOne({
        '_id': id,
        'mobile': mobile
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// for user to user connection

//get User Connection Detail of single user
exports.getOneUserDetByCondition = (condition, requireFields) => {
    if (requireFields) {
        return UserAllConnModel.findOne(condition, requireFields)
    } else {
        return UserAllConnModel.findOne(condition)
    }
}


// For Create User 
exports.getTestModel = () => {
    return TestModel;
};


