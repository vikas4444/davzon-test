const _ = require('lodash');
const constant = require('../utils/constant');
const res = require('../utils/custom-response');
const utils = require('../utils/utilities');
var ObjectId = require('mongodb').ObjectID;
const { LookoutEquipment } = require('aws-sdk');
const userDAO = require('../dao/user-dao');
const jwt = require('jsonwebtoken');






const AppService = {

    async signUp(userDetail) {
        try {
            console.log("dfbfbdfb",userDetail.role.includes(['MANAGER','DEVELOPER']))
            if (userDetail.role.some(value => ['MANAGER','DEVELOPER'].includes(value)) == true) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'not authrized !!.'));
            }

            if (!userDetail.email) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please Enter Email'));
            }
            if (!userDetail.mobile) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please Enter Mobile Number'));
            }
            if (!userDetail.password) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please Enter Password'));
            }
            if (!userDetail.role) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please Enter role'));
            }


            if (userDetail.latitude && userDetail.longitude) {
                const location = {
                    coordinates: [userDetail.latitude, userDetail.longitude]
                }
                userDetail['location'] = location;
            }

            const getEncryptrdPswd = utils.encrypt(userDetail.password)
            userDetail['password'] = getEncryptrdPswd;
            if (!userDetail.role) {

                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'role required'));
            }

            if (userDetail.role.some(value => constant.lookup.role.includes(value)) != true) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'invalid role found !!.'));
            }

            if (userDetail.role.includes(['MANAGER','DEVELOPER']) == true){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'not authrized !!.'));
            }

            const checkIfUserAlreadyExist = await userDAO.getOne({
                $or: [{
                    email: userDetail.email
                }, {
                    mobile: userDetail.mobile
                }]
            });
            if (checkIfUserAlreadyExist) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.CONFLICT, 'User Information Already Exist !!'));
            }

            const CreateUser = await userDAO.registerUser(userDetail);
            console.log(CreateUser)
            if (CreateUser == null) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, "Failed to create new user !!"))
            }

            let result = await userDAO.getUserModel().findOneAndUpdate(
                {
                },
                {$set:{"myusers.$[elex].isVerified":true,
                "myusers.$[elex].userId":CreateUser._id
                // "myusers.$[elex].isVerified":true
            }},
                {
                    arrayFilters: [{ 'elex.email': userDetail.email}],
                },function (err, docs) {
                    if (err){

                        console.log(err)
                    }
                    else{
                        console.log("Original Doc : ",docs);
                    }
                }
                ).clone();

            return Promise.resolve({
                message: "User Created Succesfully !!",
                status: constant.HTML_STATUS_CODE.CREATED
            })
        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },



    async signIn(loginDetails) {
        try {
            if (!loginDetails.userName) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please Enter userName'));
            }
            if (!loginDetails.password) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please Enter password'));
            }

            const userData = await userDAO.getOne({
                $or: [{
                    email: loginDetails.userName
                }, {
                    mobile: loginDetails.mobile
                }]
            });
            if (userData == null) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Invalid Credentials !!'));
            }
            const getDecryptedPswd = utils.decrypt(userData.password)
            if (getDecryptedPswd != loginDetails.password) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Invalid Credentials !!'));
            }

            const token = jwt.sign(_.pick(userData, ['_id', 'name','email', 'mobile','role']), constant.APP_SECRETE, {
                expiresIn: constant.TOKEN_TIMEOUT
            });
            return Promise.resolve({
                message: "Login Succesfully!!",
                status : constant.HTML_STATUS_CODE.SUCCESS,
                data: {
                    token,
                    mobile: userData.mobile,
                    email: userData.email,
                    _id: userData._id,
                    ownerName: userData.name,
                    role:userData.role
                }
            });

        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

};

module.exports = AppService;