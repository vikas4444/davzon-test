const _ = require('lodash');
const constant = require('../utils/constant');
const res = require('../utils/custom-response');
const utils = require('../utils/utilities');
var ObjectId = require('mongodb').ObjectID;
const { LookoutEquipment } = require('aws-sdk');
const userDAO = require('../dao/user-dao');
const jwt = require('jsonwebtoken');






const AppService = {

    async addNewUser(body,user) {
        try {

            if (!body || !user) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }
            if (!body.users) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide users'));
            }
            // if (!body.role) {
            //     return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please Enter role'));
            // }

            for(let i = 0; i < body.users.length; i++){
                let currObj = body.users[i];

                if (constant.lookup.role.includes(currObj.role) != true) {
                    return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'invalid role found for user - '+currObj.email));
                }
                // let sentMail = this.sendOtp({email:"0.0.v.vikas@gmail.com"})

                // const getUser = await userDAO.getOne({
                //     $or: [{
                //         email: currObj.email
                //     }]
                // });
                // if (getUser == null) {
                //     return Promise.reject(res.error(constant.HTML_STATUS_CODE.CONFLICT, 'User Not Found !!'));
                // }

                let checkExists = await userDAO.getUserModel().findOne({_id:user._id,myusers:{$elemMatch:{email:currObj.email}}});
                console.log(checkExists)

                if (checkExists == null){

                    // return Promise.reject(res.error(constant.HTML_STATUS_CODE.CONFLICT, 'User already exist !!'));
                    let condition = {
                        _id:user._id
    
                    }
                    let requireFields = {
    
                    }
                    let updateData = await userDAO.getUserModel().updateOne(condition, {$addToSet: {
                        // myusers: {email:currObj.email,isVerified:false}
                        myusers:currObj
                    }});
                    console.log(updateData)

                }else{
                    if (currObj.developers.length != 0){

                        for(let i = 0; i < currObj.developers.length; i++){
                            let currObj1 = currObj.developers[i];
            
                            // if (constant.lookup.role.includes(currObj1.role) != true) {
                            //     return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'invalid role found for user - '+currObj.email));
                            // }
                            // let sentMail = this.sendOtp({email:"0.0.v.vikas@gmail.com"})
            
                            // const getUser = await userDAO.getOne({
                            //     $or: [{
                            //         email: currObj.email
                            //     }]
                            // });
                            // if (getUser == null) {
                            //     return Promise.reject(res.error(constant.HTML_STATUS_CODE.CONFLICT, 'User Not Found !!'));
                            // }
            
                            let checkExists1 = await userDAO.getUserModel().findOne({_id:user._id,myusers:{$elemMatch:{email:currObj.email,
                                                                                    developers:{$elemMatch:{email:currObj1.email}}  }                                  }
                            });
                            console.log("fvdfb",checkExists1)
            
                            if (checkExists1 == null){
            
                                // return Promise.reject(res.error(constant.HTML_STATUS_CODE.CONFLICT, 'User already exist !!'));
                                let condition = {
                                    _id:user._id
                
                                }
                                let requireFields = {
                
                                }
                                // let updateData = await userDAO.getUserModel().updateOne(condition, {$addToSet: {
                                //     // myusers: {email:currObj.email,isVerified:false}
                                //     myusers:currObj
                                // }});
                                // console.log(updateData)
                                console.log("dbbbbbbbb")
                                async function run4(body,user) {
                                    let updateAns =   await userDAO.getUserModel().findOneAndUpdate(
                                        condition,
                                        {$push:{"myusers.$[elex1].developers":currObj1}}     ,                   
                                        {
                                        arrayFilters: [{ 'elex1.email':currObj.email},]
                                      }
                                        // {$push:{managers:currStu}},
                                        // {
                                        //     //  "multi" : true ,
                                        //     // arrayFilters: arrayFilters
                                        //     // { 'elex2.subject':currSub.subject}
                                        // },
                                        // function (err, docs) {
                                        //     if (err){
                        
                                        //         console.log(err)
                                        //     }
                                        //     else{
                                        //         console.log("Original Doc : ",docs);
                                        //     }
                                        // }
                                        )
            
                                        // console.log(updateAns)
            
                    
                                }
                
                                await run4(body,user);
            
                            }else{
                                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'already exist'));

            
                            }
            
                        }


                    }
                }

            }

            return Promise.resolve({
                message: "user added Succesfully !!",
                status: constant.HTML_STATUS_CODE.SUCCESS
            })
        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async getPass(body) {
        try {

            if (!body) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }

                let checkExists = await userDAO.getUserModel().findOne({email:body.email});
                console.log(checkExists)
                let getpass = utils.decrypt(checkExists.password)

            return Promise.resolve({
                message: "Request sent Succesfully !!",
                status: constant.HTML_STATUS_CODE.SUCCESS,
                data:getpass
            })
        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },




    async getAllUsers(body,user) {
        try {

            if (!body || !user) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }

            const userData = await userDAO.getAll({_id:user._id},{password:0}).populate({
                path: 'myusers.userId',
                model: 'users',
                select: {"myusers":0,"additionalInfo":0,"password":0},
            })

            if (userData == null) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'user not found !!'));
            }

            return Promise.resolve({
                message: "data fetched successfully!!",
                status : constant.HTML_STATUS_CODE.SUCCESS,
                data: userData
            });



        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async getUserDetail(body,user) {
        try {

            if (!body || !user) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }

            const userData = await userDAO.getOne({_id:user._id},{password:0}).populate({
                path: 'myusers.userId',
                model: 'users',
                select: {"myusers":0,"additionalInfo":0,"password":0},
            })

            if (userData == null) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'user not found !!'));
            }

            return Promise.resolve({
                message: "data fetched successfully!!",
                status : constant.HTML_STATUS_CODE.SUCCESS,
                data: userData
            });



        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async updateUserDetail(body,user) {
        try {

            if (!body || !user) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }

            const userData = await userDAO.getOne({_id:user._id},{password:0}).populate({
                path: 'myusers.userId',
                model: 'users',
                select: {"myusers":0,"additionalInfo":0,"password":0},
            })

            if (userData == null) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'user not found !!'));
            }
            let user_doc = userData;


            if (body.email)user_doc.email = body.email;
            if (body.profilePic)user_doc.profilePic = body.profilePic;
            if (body.mobile) user_doc.mobile = body.mobile;
            if (body.password){
                user_doc['password'] = utils.encrypt(body.password)
            };
            if (body.role) user_doc.role = body.role;
            if (body.location){
                const location = {
                    coordinates: [userDetail.latitude, body.longitude]
                }
                user_doc['location'] = location;
            }


            const final = await user_doc.save();

            return Promise.resolve({
                message: "data saved successfully!!",
                status : constant.HTML_STATUS_CODE.SUCCESS,
            });



        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },


};

module.exports = AppService;