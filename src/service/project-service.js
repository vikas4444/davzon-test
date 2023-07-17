const _ = require('lodash');
const constant = require('../utils/constant');
const res = require('../utils/custom-response');
const utils = require('../utils/utilities');
var ObjectId = require('mongodb').ObjectId;
const { LookoutEquipment } = require('aws-sdk');
const userDAO = require('../dao/user-dao');
const projDAO = require('../dao/project-dao');



const jwt = require('jsonwebtoken');






const ProjService = {

    async createProj(body,user) {
        try {
            console.log(user)

            if (body == null || body == undefined) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }
            if (user == null || user == undefined) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide users'));
            }
            if (!body.name) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide name'));
            }
            if (!body.type) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide type'));

            }
            if (!body.docs) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide docs'));
            }
            if (!body.dueDate) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide dueDate'));
            }


            let createTest = await projDAO.addTest(body,user);

            console.log(createTest)

            return Promise.resolve({
                message: "project added Succesfully !!",
                status: constant.HTML_STATUS_CODE.SUCCESS
            })

        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async updateProj(body,user) {
        try {
            console.log(user)

            if (body == null || body == undefined) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }
            if (user == null || user == undefined) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide users'));
            }
            // if (!body.name) {
            //     return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide name'));
            // }
            // if (!body.type) {
            //     return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide type'));

            // }
            // if (!body.docs) {
            //     return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide docs'));
            // }
            // if (!body.dueDate) {
            //     return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide dueDate'));
            // }
            // if (!body.status) {
            //     return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide status'));
            // }

            let projId1 = body.projId
            delete body.projId


            // let createTest = await projDAO.addTest(body,user);
            // let createTest = await projDAO.updateByCondition({_id:ObjectId(body.projId)},body)
            // console.log(createTest)

            async function run5(body,user) {
                
                result = await projDAO.getTestModel().findOneAndUpdate(
                    {_id:ObjectId(projId1)}
                      ,
                    {$set:body},
                    ).then((data) => {
                        // console.log("data",data); // 👉️ 42
    
                        return{                
                            status:constant.HTML_STATUS_CODE.SUCCESS,
                            message:"data updated successfully!"}
                        // return data
                    })
                    .catch(err => {
                        console.log(err);
                        return{                
                            status:constant.HTML_STATUS_CODE.INTERNAL_ERROR,
                            message:"failed to update data"}
                    }
                    );

                console.log(result)
                return result
                }

            let fin  = await run5(body,user);
            console.log("fin",fin)
            if (fin.status != 200){
                return fin
            }

            console.log(body)

            return Promise.resolve({
                message: "updated Succesfully !!",
                status: constant.HTML_STATUS_CODE.SUCCESS
            })

        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async getTestDetails(params) {
        try {
            console.log(params)

            if (params == null || params == undefined) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }

            let getTest = await projDAO.getOne({_id:params.testId});
            if (getTest == null){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'no test found'));

            }
            // console.log(createTest)




            return Promise.resolve({
                message: "data fetched Succesfully !!",
                status: constant.HTML_STATUS_CODE.SUCCESS,
                data:getTest
            })
        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async getMyTests(body,user) {
        try {

            if (!body || !user) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }
            if (user.role.includes("ADMIN","TUTOR")){
                const userData = await projDAO.getAll({userId:user._id},{}).populate({
                    path: 'userId',
                    model: 'users',
                    select: {"myusers":0,"additionalInfo":0,"password":0},
                })
                // console.log(userData)
    
                if (userData.length == 0) {
                    return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'no data found !!'));
                }
                return Promise.resolve({
                    message: "data fetched successfully!!",
                    status : constant.HTML_STATUS_CODE.SUCCESS,
                    data: userData
                });
    
            }
            if(user.role.includes("ADMIN","TUTOR")){
                return Promise.resolve({
                    message: "no test available for student!!",
                    status : constant.HTML_STATUS_CODE.NOT_FOUND,
                    // data: userData
                });


            }



            // if (!loginDetails.role) {
            //     return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please Enter role'));
            // }

            // if(loginDetails.role == "ADMIN"){

            //     const userData = await adminDAO.getOne({
            //         $or: [{
            //             email: loginDetails.userName
            //         }, {
            //             mobile: loginDetails.mobile
            //         }]
            //     });
            //     if (userData == null) {
            //         return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Invalid Credentials !!'));
            //     }
            //     const getDecryptedPswd = utils.decrypt(userData.password)
            //     if (getDecryptedPswd != loginDetails.password) {
            //         return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Invalid Credentials !!'));
            //     }
            //     // if (userData.role == undefined || userData.role == null){
            //     //     userData.role = "SELLER"
            //     //     userData.save();
            //     // }
            //     const token = jwt.sign(_.pick(userData, ['_id', 'name','email', 'mobile','role']), constant.APP_SECRETE, {
            //         expiresIn: constant.TOKEN_TIMEOUT
            //     });
            //     return Promise.resolve({
            //         message: "Login Succesfully!!",
            //         status : constant.HTML_STATUS_CODE.SUCCESS,
            //         data: {
            //             token,
            //             mobile: userData.mobile,
            //             email: userData.email,
            //             _id: userData._id,
            //             ownerName: userData.name,
            //             role:userData.role
            //         }
            //     });

            // }
            // if(loginDetails.role == "PARENT"){

            //     const userData = await parentDAO.getOne({
            //         $or: [{
            //             email: loginDetails.userName
            //         }, {
            //             mobile: loginDetails.mobile
            //         }]
            //     });ADMIN
            //     if (userData == null) {
            //         return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Invalid Credentials !!'));
            //     }
            //     const getDecryptedPswd = utils.decrypt(userData.password)
            //     if (getDecryptedPswd != loginDetails.password) {
            //         return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Invalid Credentials !!'));
            //     }
            //     // if (userData.role == undefined || userData.role == null){
            //     //     userData.role = "SELLER"
            //     //     userData.save();
            //     // }
            //     const token = jwt.sign(_.pick(userData, ['_id', 'name','email', 'mobile','role']), constant.APP_SECRETE, {
            //         expiresIn: constant.TOKEN_TIMEOUT
            //     });
            //     return Promise.resolve({
            //         message: "Login Succesfully!!",
            //         status : constant.HTML_STATUS_CODE.SUCCESS,
            //         data: {
            //             token,
            //             mobile: userData.mobile,
            //             email: userData.email,
            //             _id: userData._id,
            //             ownerName: userData.name,
            //             role:userData.role
            //         }
            //     });
                
            // }
            // if(loginDetails.role == "TUTOR"){
            //     const userData = await tutorDAO.getOne({
            //         $or: [{
            //             email: loginDetails.userName
            //         }, {
            //             mobile: loginDetails.mobile
            //         }]
            //     });
            //     if (userData == null) {
            //         return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Invalid Credentials !!'));
            //     }
            //     const getDecryptedPswd = utils.decrypt(userData.password)
            //     if (getDecryptedPswd != loginDetails.password) {
            //         return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Invalid Credentials !!'));
            //     }
            //     // if (userData.role == undefined || userData.role == null){
            //     //     userData.role = "SELLER"
            //     //     userData.save();
            //     // }
            //     const token = jwt.sign(_.pick(userData, ['_id', 'name','email', 'mobile','role']), constant.APP_SECRETE, {
            //         expiresIn: constant.TOKEN_TIMEOUT
            //     });
            //     return Promise.resolve({
            //         message: "Login Succesfully!!",
            //         status : constant.HTML_STATUS_CODE.SUCCESS,
            //         data: {
            //             token,
            //             mobile: userData.mobile,
            //             email: userData.email,
            //             _id: userData._id,
            //             ownerName: userData.name,
            //             role:userData.role
            //         }
            //     });
                
            // }
            // if(loginDetails.role == "STUDENT"){

            //     const userData = await studentDAO.getOne({
            //         $or: [{
            //             email: loginDetails.userName
            //         }, {
            //             mobile: loginDetails.mobile
            //         }]
            //     });
            //     if (userData == null) {
            //         return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Invalid Credentials !!'));
            //     }
            //     const getDecryptedPswd = utils.decrypt(userData.password)
            //     if (getDecryptedPswd != loginDetails.password) {
            //         return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Invalid Credentials !!'));
            //     }
            //     // if (userData.role == undefined || userData.role == null){
            //     //     userData.role = "SELLER"
            //     //     userData.save();
            //     // }
            //     const token = jwt.sign(_.pick(userData, ['_id', 'name','email', 'mobile','role']), constant.APP_SECRETE, {
            //         expiresIn: constant.TOKEN_TIMEOUT
            //     });
            //     return Promise.resolve({
            //         message: "Login Succesfully!!",
            //         status : constant.HTML_STATUS_CODE.SUCCESS,
            //         data: {
            //             token,
            //             mobile: userData.mobile,
            //             email: userData.email,
            //             _id: userData._id,
            //             ownerName: userData.name,
            //             role:userData.role
            //         }
            //     });
                
            // }

        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

};

module.exports = ProjService;