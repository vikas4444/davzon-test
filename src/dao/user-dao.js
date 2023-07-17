const UserModel = require('../model/user-schema');


// For Create User 
exports.registerUser = (body) => {
    return new UserModel({
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        password: body.password,
        role:body.role
        // location: body.location
    }).save();
};


//get single document by condition
exports.getOne = (condition, requireFields) => {
    if (requireFields) {
        return UserModel.findOne(condition, requireFields)
    } else {
        return UserModel.findOne(condition)
    }
}

//Update By Condition
exports.addNewUserAddress = (condition, updateFields) => {
    return UserModel.updateOne(condition, {
        $addToSet: updateFields
    });
};

//Update By Condition
exports.updateByCondition = (condition, updateFields) => {
    return UserModel.updateOne(condition, updateFields);
};

exports.getAll = (condition, requireFields) => {
    if (requireFields) {
        return UserModel.find(condition, requireFields)
    } else {
        return UserModel.find(condition)
    }
}


//get all documents 
exports.getByConditions = (conditions = {},requireFields) => {
    return UserModel.find(conditions,requireFields).limit(50);
}

//get user on id and mobile
exports.getById = (id, mobile) => {
    return UserModel.findOne({
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
exports.getUserModel = () => {
    return UserModel;
};


