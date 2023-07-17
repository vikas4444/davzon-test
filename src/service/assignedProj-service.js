const _ = require('lodash');
const constant = require('../utils/constant');
const res = require('../utils/custom-response');
const utils = require('../utils/utilities');
var ObjectId = require('mongodb').ObjectId;
const { LookoutEquipment } = require('aws-sdk');
const userDAO = require('../dao/user-dao');
const projDAO = require('../dao/project-dao');
const assignProjDAO = require('../dao/assignedProj-dao');


const jwt = require('jsonwebtoken');






const TestService = {

    async assignProj(body,user) {
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
            if (!body.dueDate) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide dueDate'));
            }
            if (!body.managers) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide students details'));
            }
            body.testId = ObjectId(body.testId)

            let checkTest = await projDAO.getOne({_id:body.testId});
            if (checkTest == null){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid testId passed'));

            }
            let getAss = null
            console.log("dbbb",checkTest)
            let checkAss =   await assignProjDAO.getTestModel().findOne(
                {
                    testId: body.testId,
                    userId:user._id
                },
                )

            if (checkAss == null){
                getAss = await assignProjDAO.assignTest(body,user);

            }else{

                 getAss = await assignProjDAO.getTestModel().findOne(
                    {
                        testId: body.testId,
                        userId:user._id
    
                    },
                    )
            }

            // console.log(createTest)
            if (getAss != null){
                for(let i = 0; i < body.managers.length; i++){
                    let currStu = body.managers[i];
                    if (!currStu.name) {
                        return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide name'));
                    }
                    if (!currStu.durationType) {
                        return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide durationtype'));
                    }

                    if (!currStu.dueDate) {
                        return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide dueDate'));
                    }

                    let checkAl = await  assignProjDAO.getTestModel().findOne({
                        testId: body.testId,
                        userId:user._id,
                        managers:{$elemMatch:{userId:ObjectId(currStu._id)}}
                    });

                    console.log(checkAl)

                    if (checkAl!=null){
                        return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'user already exists'));

                    }

                }

                for(let i = 0; i < body.managers.length; i++){
                    let currStu = body.managers[i];
                    currStu.userId = currStu._id
                    delete currStu._id
                    console.log("dfsf",currStu)

                    // stuArr.push({userId:ObjectId(body.students[i]) })

                    async function run4(body,user) {
                        let updateAns =   await assignProjDAO.getTestModel().findOneAndUpdate(
                            {
                                testId: body.testId,
                                userId:user._id
            
                            },
                            {$push:{managers:currStu}},
                            {

                            },
 
                            )

                            // console.log(updateAns)

        
                    }
    
                    await run4(body,user);
                } 


            }else{
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'not able to create test'));


            }

            return Promise.resolve({
                message: "assigned Succesfully !!",
                status: constant.HTML_STATUS_CODE.SUCCESS
            })
        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async unassignProj(body,user) {
        try {
            console.log(user)

            if (body == null || body == undefined) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }
            if (user == null || user == undefined) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide users'));
            }
            if (!body.managers) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide students details'));
            }
            body.testId = ObjectId(body.testId)

            let checkTest = await projDAO.getOne({_id:body.testId});
            if (checkTest == null){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid testId passed'));

            }
            let getAss = null
            console.log("dbbb",checkTest)
            let checkAss =   await assignProjDAO.getTestModel().findOne(
                {
                    testId: body.testId,
                    userId:user._id
                },
                )

            if (checkAss == null){
                getAss = await assignProjDAO.assignTest(body,user);

            }else{

                 getAss = await assignProjDAO.getTestModel().findOne(
                    {
                        testId: body.testId,
                        userId:user._id
    
                    },
                    )
            }

            // console.log(createTest)
            if (getAss != null){
                for(let i = 0; i < body.managers.length; i++){
                    let currStu = body.managers[i];
                    if (!currStu.name) {
                        return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide name'));
                    }
                    if (!currStu.durationType) {
                        return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide durationtype'));
                    }

                    if (!currStu.dueDate) {
                        return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'Please provide dueDate'));
                    }

                    let checkAl = await  assignProjDAO.getTestModel().findOne({
                        testId: body.testId,
                        userId:user._id,
                        managers:{$elemMatch:{userId:ObjectId(currStu._id)}}
                    });

                    console.log(checkAl)

                    if (checkAl!=null){
                        return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'user already exists'));

                    }

                }

                for(let i = 0; i < body.managers.length; i++){
                    let currStu = body.managers[i];
                    currStu.userId = currStu._id
                    delete currStu._id
                    console.log("dfsf",currStu)

                    // stuArr.push({userId:ObjectId(body.students[i]) })

                    async function run4(body,user) {
                        let updateAns =   await assignProjDAO.getTestModel().findOneAndUpdate(
                            {
                                testId: body.testId,
                                userId:user._id
            
                            },
                            {$push:{managers:currStu}},
                            {

                            },
 
                            )

                            // console.log(updateAns)

        
                    }
    
                    await run4(body,user);
                } 


            }else{
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'not able to create test'));


            }

            return Promise.resolve({
                message: "unassigned Succesfully !!",
                status: constant.HTML_STATUS_CODE.SUCCESS
            })
        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async getProjDetails(params) {
        try {
            console.log(params)

            if (params == null || params == undefined) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }

            let getTest = await assignProjDAO.getOne({_id:params.testId}).populate({
                path: 'testId',
                model: 'tests',
                select: {},
            })
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


    async viewAssignedProjs(body) {
        try {
            // console.log(body)

            if (body == null || body == undefined) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }
            if (!body.userId) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'userId required'));
            }
            if (!body.testId) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'testId required'));
            }
            if (!body.studentId) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'studentId required'));
            }

            let getTest = await assignProjDAO.getOne({testId:body.testId,userId:body.userId,
                students:{$elemMatch:{userId:body.studentId}}

            },{"students.$":1}).populate({
                path: 'testId',
                model: 'tests',
                select: {},
            }).populate({
                path: 'students.userId',
                model: 'users',
                select: {password:0},
            })
            if (getTest == null){
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'no data found'));

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


    async getAllAssignedProjs(body,user) {
        try {

            if (!body || !user) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }
            console.log(user)

            if (user.role.includes("ADMIN")){
                const userData = await assignProjDAO.getAll({userId:user._id})
                // .populate({
                //     path: 'userId',
                //     model: 'users',
                //     select: {"myusers":0,"additionalInfo":0,"password":0},
                // }).populate({
                //     path: 'students.userId',
                //     model: 'users',
                //     select: {"myusers":0,"additionalInfo":0,"password":0},
                // })
                console.log(userData)
    
            //     if (userData == null) {
            //         return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'no not found !!'));
            //     }
    
                return Promise.resolve({
                    message: "data fetched successfully!!",
                    status : constant.HTML_STATUS_CODE.SUCCESS,
                    data: userData
                });

            }
            if (user.role.includes("MANAGER")){
                console.log("dfbfdbfbf")
                const userData = await assignProjDAO.getAll({"managers":{$elemMatch:{userId:user._id}}},{})
                // .populate({
                //     path: 'userId',
                //     model: 'users',
                //     select: {"myusers":0,"additionalInfo":0,"password":0},
                // }).populate({
                //     path: 'students.userId',
                //     model: 'users',
                //     select: {"myusers":0,"additionalInfo":0,"password":0},
                // })
                console.log(userData)
    
                if (userData == null) {
                    return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'no not found !!'));
                }
    
                return Promise.resolve({
                    message: "data fetched successfully!!",
                    status : constant.HTML_STATUS_CODE.SUCCESS,
                    data: userData
                });


            }

            if (user.role.includes("DEVELOPER")){
                console.log("dfbfdbfbf")
                const userData = await assignProjDAO.getAll({"managers.$[].developers":{_id:user._id}})
                // .populate({
                //     path: 'userId',
                //     model: 'users',
                //     select: {"myusers":0,"additionalInfo":0,"password":0},
                // }).populate({
                //     path: 'students.userId',
                //     model: 'users',
                //     select: {"myusers":0,"additionalInfo":0,"password":0},
                // })
                console.log(userData)
    
                if (userData == null) {
                    return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'no not found !!'));
                }
    
                return Promise.resolve({
                    message: "data fetched successfully!!",
                    status : constant.HTML_STATUS_CODE.SUCCESS,
                    data: userData
                });


            }

        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async updateAssignedProjs(body,user) {
        try {

            if (!body || !user) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.NOT_FOUND, 'invalid request'));
            }

            let assProId = body.testId
            console.log(assProId);

            for (let i = 0; i < body?.managers?.length; i++) {

                let prodObj = body.managers[i];
                let baseVal = "managers.$[elex]."
                let prodId = null
                let updatePair = {}
                let userId = null



                Object.entries(prodObj).forEach(async([key, value], index) => {
                    if (key == "_id") {
                        userId = prodObj[key]
                    }
                    else {

                        if (key && key != null && key != "" && key != 0 && key != "$") {
                            // console.log("1")
                            baseVal += key
                            updatePair[baseVal] = value
                            baseVal = "managers.$[elex]."
                        }

                        if (key == "developers"){

                            for (let i = 0; i < value?.length; i++) {

                                let prodObj1 = value[i];
                                let baseVal1 = "managers.$[elex].developers.$[elex1]."
                                let prodId1 = null
                                let updatePair1 = {}
                                let userId1 = null
                
                                Object.entries(prodObj1).forEach(([key1, value1], index) => {
                                    console.log("fdaf",key1)
                                    if (key1 == "_id") {
                                        userId1 = prodObj1[key1]
                                    }
                                    else {
                
                                        if (key1 && key1 != null && key1 != "" && key1 != 0 && key1 != "$") {
                                            // console.log("1")
                                            baseVal1 += key1
                                            updatePair1[baseVal1] = value1
                                            baseVal1 = "managers.$[elex].developers.$[elex1]."
                                        }
                
                                    }
                
                
                                });
                                console.log("5",updatePair1,userId)
                                let cond2 = {_id:ObjectId(assProId),managers:{$elemMatch:{userId:userId}}}
                
                                async function run5(body,user,cond1) {
                
                                result = await assignProjDAO.getTestModel().findOneAndUpdate(
                                    cond1
                                      ,
                                    {$set:updatePair},
                                    {
                                        arrayFilters: [{ 'elex.userId': ObjectId(userId)},{ 'elex1._id': ObjectId(userId1)}],
                                    }
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
                
                
                    
                                }
                
                                await run5(body,user,cond2);
                
                            }

                        }
                    }

                });
                console.log("4",updatePair,userId)
                let cond1 = {_id:ObjectId(assProId),managers:{$elemMatch:{userId:userId}}}

                async function run4(body,user,cond1) {


                result = await assignProjDAO.getTestModel().findOneAndUpdate(
                    cond1
,
                    {$set:updatePair},
                    {
                        arrayFilters: [{ 'elex.userId': ObjectId(userId)}],
                    }
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

                }

                await run4(body,user,cond1);

            }

            return Promise.resolve({
                message: "data updated successfully!!",
                status : constant.HTML_STATUS_CODE.SUCCESS,
            });

        } catch (error) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },


};

module.exports = TestService;